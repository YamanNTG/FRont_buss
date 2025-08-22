import { useNavigate } from 'react-router-dom';
import { useDispatch } from '@/utils/hooks';
import { deleteIssue } from '@/features/thunks/issuesThunk';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface DeleteIssueButtonProps {
  issueId: string;
}

const DeleteIssueButton = ({ issueId }: DeleteIssueButtonProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!issueId) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete this issue?',
    );
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await dispatch(deleteIssue(issueId)).unwrap();
      toast.success('Issue deleted!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate('/safety');
    } catch (error) {
      console.error(error);
      alert('Failed to delete issue');
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
      {isDeleting ? 'Deleting...' : 'Delete Issue'}
    </button>
  );
};

export default DeleteIssueButton;
