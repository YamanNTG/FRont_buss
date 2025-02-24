import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/utils/hooks';
import { getAllNews } from '@/features/thunks/newsThunk';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatDate';
import { NewsItem } from '@/types/news';
import InfiniteScroll from 'react-infinite-scroll-component';
import useNewsSocket from '../utils/useNewsSocket';

interface NewsState {
  news: NewsItem[];
  count: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  isLoading: boolean;
}

function NewsFeed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { news, count, currentPage, hasMore, isLoading } = useSelector(
    (state) => state.news as NewsState,
  );

  // Use the news socket hook for real-time updates
  const { isConnected, socketId } = useNewsSocket();

  const loadMoreNews = () => {
    if (!isLoading && hasMore) {
      dispatch(getAllNews({ page: currentPage + 1 }));
    }
  };

  useEffect(() => {
    dispatch(getAllNews({ page: 1 }));

    // Log socket connection status
    if (isConnected) {
      console.log(
        'News feed connected to real-time updates, socket ID:',
        socketId,
      );
    }
  }, [dispatch, isConnected, socketId]);

  if (count === 0 && !isLoading) {
    return (
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          News Feed
        </h1>
        <h3 className="text-2xl font-medium text-gray-600">
          There are no news to display...
        </h3>
        {user?.role === 'admin' && (
          <Button
            onClick={() => navigate('/createNews')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Create News
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          News Feed
        </h1>

        {/* Optional real-time indicator */}
        {isConnected && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Real-time updates active
          </div>
        )}

        {user?.role === 'admin' && (
          <Button
            onClick={() => navigate('/createNews')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Create News
          </Button>
        )}
      </div>

      <InfiniteScroll
        dataLength={news.length}
        next={loadMoreNews}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You have seen all the news!</b>
          </p>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news?.map((newsItem) => (
            <Card
              key={newsItem._id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 rounded-xl bg-white flex flex-col group"
            >
              <CardHeader
                className="px-6 pt-6 pb-4"
                onClick={() => navigate(`/news/${newsItem._id}`)}
              >
                <CardTitle
                  className="text-xl font-bold tracking-tight text-gray-900 
                  line-clamp-2 leading-tight 
                 group-hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {newsItem.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-6 flex-grow">
                <p className="text-gray-600 leading-relaxed text-base line-clamp-3 relative">
                  {newsItem.description}
                  {newsItem.description &&
                    newsItem.description.length > 150 && (
                      <span
                        className="absolute bottom-0 right-0 bg-white pl-2 
                         text-blue-600 hover:underline cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/news/${newsItem._id}`);
                        }}
                      >
                        View More
                      </span>
                    )}
                </p>
                {newsItem.image && (
                  <div
                    className="aspect-video w-full overflow-hidden rounded-lg shadow-md cursor-pointer"
                    onClick={() => navigate(`/news/${newsItem._id}`)}
                  >
                    <img
                      src={newsItem.image}
                      alt={newsItem.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </CardContent>
              <div className="text-center border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500">
                  {formatDate(newsItem.createdAt)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default NewsFeed;
