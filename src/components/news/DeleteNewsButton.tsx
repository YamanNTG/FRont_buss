import { useNavigate } from 'react-router-dom';
import { useDispatch } from '@/utils/hooks';
import { deleteNews } from '@/features/thunks/newsThunk';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface DeleteNewsButtonProps {
  newsId: string;
}

const DeleteNewsButton = ({ newsId }: DeleteNewsButtonProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!newsId) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete this news article?',
    );
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await dispatch(deleteNews(newsId)).unwrap();
      toast.success('Article deleted!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('Failed to delete news article');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
    >
      {isDeleting ? 'Deleting...' : 'Delete Article'}
    </button>
  );
};

export default DeleteNewsButton;
