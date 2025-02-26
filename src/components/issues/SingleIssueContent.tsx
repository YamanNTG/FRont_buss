import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/utils/hooks';
import { getSingleIssue } from '@/features/thunks/issuesThunk';
import { formatDate } from '@/utils/formatDate';

import LocationViewer from './LocationViewer';

interface SingleIssueContentProps {
  issueId: string;
}

const SingleIssueContent = ({ issueId }: SingleIssueContentProps) => {
  const dispatch = useDispatch();
  const { singleIssue, isLoading, error } = useSelector(
    (state) => state.issues,
  );

  useEffect(() => {
    dispatch(getSingleIssue(issueId));
  }, [dispatch, issueId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!singleIssue) {
    return <div>Issue not found</div>;
  }

  const defaultLocation = { lat: 53.3498, lng: -6.2603 };
  const locationToUse = singleIssue.location
    ? singleIssue.location
    : defaultLocation;

  return (
    <article className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1
        className="text-xl font-bold tracking-tight text-gray-900 
      line-clamp-2 leading-tight 
      group-hover:text-blue-600 transition-colors"
      >
        {singleIssue.title}
      </h1>

      <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
        <LocationViewer
          location={{
            lat: locationToUse.lat,
            lng: locationToUse.lng,
          }}
          defaultLocation={{ lat: 53.3498, lng: -6.2603 }}
          hideDefaultLocationMarker={true}
          showCurrentLocation={true}
        />
      </div>

      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-8">
        {singleIssue.description}
      </p>

      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <div className="flex items-center space-x-4">
          {
            <img
              src={
                singleIssue.user?.profileImage
                  ? singleIssue.user.profileImage
                  : 'https://res.cloudinary.com/dzilw7kgd/image/upload/v1740485864/TransitTask-Assets/tmp-3-1740485864487_sdmyhn.png'
              }
              alt="User profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          }
          {
            <span className="text-sm text-gray-600">
              {singleIssue.user?.name || 'Anonymous'}
            </span>
          }
        </div>
        <span
          className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${
                singleIssue.status === 'open'
                  ? 'bg-blue-100 text-blue-800'
                  : singleIssue.status === 'in-progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
              }
            `}
        >
          {singleIssue.status}
        </span>
        <p className="text-sm text-gray-500">
          {formatDate(singleIssue.createdAt)}
        </p>
      </div>
    </article>
  );
};

export default SingleIssueContent;
