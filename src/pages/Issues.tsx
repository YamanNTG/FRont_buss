import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDispatch, useSelector } from '@/utils/hooks';
import { getAllIssues } from '@/features/thunks/issuesThunk';
import { IssuesItem } from '@/types/issues';
import LocationPicker from '../components/issues/LocationPicker';
import { formatDate } from '@/utils/formatDate';
import InfiniteScroll from 'react-infinite-scroll-component';

interface IssuesState {
  issues: IssuesItem[];
  count: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  isLoading: boolean;
}

const Issues = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { issues, count, currentPage, hasMore, isLoading } = useSelector(
    (state) => state.issues as IssuesState,
  );

  const loadMoreIssues = () => {
    if (!isLoading && hasMore) {
      dispatch(getAllIssues({ page: currentPage + 1 }));
    }
  };

  useEffect(() => {
    if (issues.length === 0) {
      dispatch(getAllIssues({ page: 1 }));
    }
  }, []);

  if (count === 0 && !isLoading) {
    return (
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Safety Issues
        </h1>
        <h3 className="text-2xl font-medium text-gray-600">
          There are no issues to display...
        </h3>
        <Button
          onClick={() => navigate('/createIssue')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Create Issue
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Safety Issues
        </h1>
        <Button
          onClick={() => navigate('/createIssue')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Create Issue
        </Button>
      </div>

      <InfiniteScroll
        dataLength={issues.length}
        next={loadMoreIssues}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You have seen all the issues!</b>
          </p>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {issues.map((issue) => {
            const location = issue.location || { lat: 53.3498, lng: -6.2603 };

            return (
              <Card
                key={issue._id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 rounded-xl bg-white flex flex-col"
              >
                <div
                  onClick={() => navigate(`/issues/${issue._id}`)}
                  className="cursor-pointer"
                >
                  <CardHeader className="px-6 pt-6 pb-4">
                    <CardTitle className="text-xl font-bold tracking-tight text-gray-900 line-clamp-2 leading-tight">
                      {issue.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6 px-6 flex-grow">
                    <p className="text-gray-600 leading-relaxed text-base line-clamp-3">
                      {issue.description}
                    </p>

                    <div
                      className="aspect-video w-full overflow-hidden rounded-lg shadow-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LocationPicker
                        isPinDraggable={false}
                        onLocationSelect={() => {}}
                        initialLocation={{
                          lat: location.lat,
                          lng: location.lng,
                        }}
                      />
                    </div>
                  </CardContent>
                </div>

                <div className="border-t border-gray-200 px-6 py-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <img
                        src={
                          issue.user?.profileImage ||
                          '/default-profile-image.png'
                        }
                        alt={issue.user?.name || 'Anonymous'}
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                      />
                      <span className="text-sm text-gray-600">
                        {issue.user?.name || 'Anonymous'}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded-full ${
                        issue.status === 'open'
                          ? 'bg-blue-100 text-blue-800'
                          : issue.status === 'in-progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : issue.status === 'resolved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {issue.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    {formatDate(issue.createdAt)}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Issues;
