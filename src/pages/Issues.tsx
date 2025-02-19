import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDispatch, useSelector } from '@/utils/hooks';
import { useEffect } from 'react';
import { getAllIssues } from '@/features/thunks/issuesThunk';
import { IssuesItem } from '@/types/issues';
import LocationPicker from '../components/issues/LocationPicker';
import { formatDate } from '@/utils/formatDate';

interface IssuesState {
  issues: IssuesItem[];
  count: number;
}

const Issues = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getIssues = async () => {
      try {
        await dispatch(getAllIssues()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    getIssues();
  }, []);

  const { issues, count } = useSelector((state) => state.issues as IssuesState);

  if (count === 0) {
    return (
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Safety Issues
        </h1>
        <h3 className="text-2xl font-medium text-gray-600">
          There are no issues to display...
        </h3>

        <Button
          onClick={() => navigate('/createIssues')}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {issues.map((issue) => {
          // Default location if not present
          const location = issue.location || {
            lat: 53.3498,
            lng: -6.2603,
          };

          return (
            <Card
              key={issue._id}
              onClick={() => navigate(`/issues/${issue._id}`)}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 rounded-xl bg-white flex flex-col"
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
                    onLocationSelect={() => {}} // No-op for display mode
                    initialLocation={{
                      lat: location.lat,
                      lng: location.lng,
                    }}
                  />
                </div>
              </CardContent>

              <div className="text-center border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500">
                  {formatDate(issue.createdAt)}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Issues;
