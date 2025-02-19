import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/utils/hooks';
import { getSingleIssue } from '@/features/thunks/issuesThunk';
import { formatDate } from '@/utils/formatDate';
import LocationPicker from './LocationPicker';

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
      <h1 className="text-3xl font-bold mb-4">{singleIssue.title}</h1>

      <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
        <LocationPicker
          isPinDraggable={false}
          onLocationSelect={() => {}} // No-op for display mode
          initialLocation={{
            lat: locationToUse.lat,
            lng: locationToUse.lng,
          }}
        />
      </div>

      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-8">
        {singleIssue.description}
      </p>

      <div className="text-center border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-500">
          {formatDate(singleIssue.createdAt)}
        </p>
      </div>
    </article>
  );
};

export default SingleIssueContent;
