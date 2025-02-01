import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from '@/utils/hooks';
import { RootState } from '../store';
import { showCurrentUser } from '@/features/thunks/userThunk';
import { useEffect, useState } from 'react';
interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
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

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;
