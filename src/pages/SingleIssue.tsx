import { useSelector } from '@/utils/hooks';
import { useParams } from 'react-router-dom';
import {
  DeleteIssuesButton,
  SingleIssueContent,
  UpdateIssuesForm,
} from '@/components';

import { useState } from 'react';

const SingleIssue = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector((state) => state.user);

  if (!id) {
    return <div>Issue not found</div>;
  }

  const isAdmin = user?.role === 'admin';

  return (
    <div className="container mx-auto py-8 px-4">
      {isEditing ? (
        <UpdateIssuesForm issueId={id} onSuccess={() => setIsEditing(false)} />
      ) : (
        <>
          <SingleIssueContent issueId={id} />

          {isAdmin && (
            <div className="mt-8 flex justify-between gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                Edit Issue
              </button>
              <DeleteIssuesButton issueId={id} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SingleIssue;
