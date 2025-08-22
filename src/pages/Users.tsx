import { RegisterInvite } from '@/components';
import ShowAllUsers from '@/components/user/ShowAllUsers';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSingleUser } from '@/hooks/useUser';
const Users = () => {
  const navigate = useNavigate();
  const { user } = useSingleUser();
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
