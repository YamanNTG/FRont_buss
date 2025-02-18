import { useDispatch, useSelector } from '@/utils/hooks';
import { getAllNews } from '@/features/thunks/newsThunk';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatDate';
import { NewsItem } from '@/types/news';

interface NewsState {
  news: NewsItem[];
  count: number;
}

function NewsFeed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getNews = async () => {
      try {
        await dispatch(getAllNews()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    getNews();
  }, [dispatch]);

  const { news, count } = useSelector((state) => state.news as NewsState);

  if (count === 0) {
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
        {user?.role === 'admin' && (
          <Button
            onClick={() => navigate('/createNews')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Create News
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news?.map((newsItem) => (
          <Card
            onClick={() => navigate(`/news/${newsItem._id}`)}
            key={newsItem._id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 rounded-xl bg-white flex flex-col"
          >
            <CardHeader className="px-6 pt-6 pb-4">
              <CardTitle className="text-xl font-bold tracking-tight text-gray-900 line-clamp-2 leading-tight">
                {newsItem.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-6 flex-grow">
              <p className="text-gray-600 leading-relaxed text-base line-clamp-3">
                {newsItem.description}
              </p>
              {newsItem.image && (
                <div className="aspect-video w-full overflow-hidden rounded-lg shadow-md">
                  <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
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
    </div>
  );
}

export default NewsFeed;
