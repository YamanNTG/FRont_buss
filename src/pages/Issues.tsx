import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDispatch, useSelector } from '@/utils/hooks';
import { getAllIssues } from '@/features/thunks/issuesThunk';
import IssuesMap from '../components/issues/IssuesMap';
import LocationViewer from '@/components/issues/LocationViewer';
import { formatDate } from '@/utils/formatDate';
import InfiniteScroll from 'react-infinite-scroll-component';
import useIssuesSocket from '../utils/useIssueSocket';
import { IssuesItem } from '@/types/issues';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  // Use the specialized socket hook for issues
  const { socket, isConnected, socketId } = useIssuesSocket();

  const loadMoreIssues = () => {
    if (!isLoading && hasMore) {
      dispatch(getAllIssues({ page: currentPage + 1 }));
    }
  };

  useEffect(() => {
    // Initial fetch
    dispatch(getAllIssues({ page: 1 }));

    if (isConnected) {
      console.log('Connected to real-time updates, socket ID:', socketId);
    }

    return () => {
      console.log('Component unmounting');
    };
  }, [dispatch, isConnected, socketId]);

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
  const openIssues = issues.filter((issue) => issue.status === 'open');
  const ongoingIssues = issues.filter(
    (issue) => issue.status === 'in-progress',
  );
  const resolvedIssues = issues.filter((issue) => issue.status === 'resolved');
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
        <div>
          <IssuesMap issues={issues} mapHeight="500px" />
        </div>
        <div className="container mx-auto px-4 pt-8 pb-4">
          <div className="mb-8">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700">
                  Open and In-Progress issues
                </h3>
                <p className="text-2xl font-bold text-blue-900">
                  {openIssues.length + ongoingIssues.length}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-700">
                  Resolved issues
                </h3>
                <p className="text-2xl font-bold text-purple-900">
                  {resolvedIssues.length}
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Open and On-Going issues</TabsTrigger>
              <TabsTrigger value="resolved">Resolved issues</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {issues
                  .filter((issue: IssuesItem) =>
                    ['open', 'in-progress'].includes(issue.status),
                  )
                  .map((issue) => (
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
                            <LocationViewer
                              location={{
                                lat: (
                                  issue.location || {
                                    lat: 53.3498,
                                    lng: -6.2603,
                                  }
                                ).lat,
                                lng: (
                                  issue.location || {
                                    lat: 53.3498,
                                    lng: -6.2603,
                                  }
                                ).lng,
                              }}
                              defaultLocation={{ lat: 53.3498, lng: -6.2603 }}
                              hideDefaultLocationMarker={true}
                              showCurrentLocation={true}
                              mapHeight="200px"
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
                                'https://res.cloudinary.com/dzilw7kgd/image/upload/v1740485864/TransitTask-Assets/tmp-3-1740485864487_sdmyhn.png'
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
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="resolved">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {issues
                  .filter((issue) => issue.status === 'resolved')
                  .map((issue) => (
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
                            <LocationViewer
                              location={{
                                lat: (
                                  issue.location || {
                                    lat: 53.3498,
                                    lng: -6.2603,
                                  }
                                ).lat,
                                lng: (
                                  issue.location || {
                                    lat: 53.3498,
                                    lng: -6.2603,
                                  }
                                ).lng,
                              }}
                              defaultLocation={{ lat: 53.3498, lng: -6.2603 }}
                              hideDefaultLocationMarker={true}
                              showCurrentLocation={true}
                              mapHeight="200px"
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
                                'https://res.cloudinary.com/dzilw7kgd/image/upload/v1740485864/TransitTask-Assets/tmp-3-1740485864487_sdmyhn.png'
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
                                : issue.status === 'on-going'
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
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Issues;
