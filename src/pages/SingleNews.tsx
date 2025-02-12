import { useSelector } from '@/utils/hooks';
import { useParams } from 'react-router-dom';
import DeleteNewsButton from '@/components/DeleteNewsButton';
import SingleNewsContent from '@/components/SingleNewsContent';
import UpdateNewsForm from '@/components/UpdateNewsForm';
import { useState } from 'react';

const SingleNews = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector((state) => state.user);

  if (!id) {
    return <div>News not found</div>;
  }

  const isAdmin = user?.role === 'admin';

  return (
    <div className="container mx-auto py-8 px-4">
      {isEditing ? (
        <UpdateNewsForm newsId={id} onSuccess={() => setIsEditing(false)} />
      ) : (
        <>
          <SingleNewsContent newsId={id} />

          {isAdmin && (
            <div className="mt-8 flex justify-between gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                Edit Article
              </button>
              <DeleteNewsButton newsId={id} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SingleNews;
