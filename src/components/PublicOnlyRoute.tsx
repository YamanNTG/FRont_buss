import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userUserActions, useSingleUser } from '@/hooks/useUser';
interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const { showCurrentUser } = userUserActions();
  const { isAuthenticated, isLoading } = useSingleUser();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await showCurrentUser();
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading while checking auth
  if (isChecking || isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;
