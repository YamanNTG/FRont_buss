import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthActions, useAuthUser } from '@/hooks/useAuth';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Verify = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const { isLoading } = useAuthUser();
  const { verifyToken } = useAuthActions();

  const verificationToken = query.get('token');
  const email = query.get('email');

  const verifyEmail = async () => {
    if (!verificationToken || !email) {
      navigate('/login');
      return;
    }
    try {
      await verifyToken({ verificationToken, email });
    } catch (error) {
      toast.error('Use the link provided in your email to get verified', {
        autoClose: 5000,
      });
      navigate('/login');
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);
  if (isLoading) {
    return <div>Verifying your email...</div>;
  }
  return (
    <div>
      Account verified go to <a href="/login">login</a>
    </div>
  );
};

export default Verify;
