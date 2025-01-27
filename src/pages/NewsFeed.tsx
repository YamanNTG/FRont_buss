import { useDispatch, useSelector } from '@/utils/hooks';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { showCurrentUser } from '@/features/thunks/userThunk';
import { useEffect } from 'react';

function NewsFeed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return <div>{user?.name}</div>;
}

export default NewsFeed;
