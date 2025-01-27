import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../store';
import { useDispatch, useSelector } from '@/utils/hooks';
import { showCurrentUser } from '@/features/thunks/userThunk';
import { useEffect, useState } from 'react';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.user
  );
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(showCurrentUser());
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [dispatch]);

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
