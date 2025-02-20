import { RegisterInvite } from '@/components';
import ShowAllUsers from '@/components/user/ShowAllUsers';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '@/utils/hooks';
import { useEffect } from 'react';
const Users = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
    }
  }, []);
  return (
    <div>
      <ShowAllUsers />
      <RegisterInvite />
    </div>
  );
};

export default Users;
