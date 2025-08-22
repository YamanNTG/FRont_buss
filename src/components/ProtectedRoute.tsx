import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userUserActions, useSingleUser } from '@/hooks/useUser';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useSingleUser();
  const { showCurrentUser } = userUserActions();
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

  if (!isAuthenticated) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
