import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  Error,
  Issues,
  HolidaySwap,
  NewsFeed,
  CreateNewsFeed,
  CreateIssue,
  SingleNews,
  ForgotPassword,
  Verify,
  ResetPassword,
  Profile,
  Users,
  SingleIssue,
} from './pages';
import {
  ProtectedRoute,
  PublicOnlyRoute,
  ErrorElement,
  InstallPWA,
} from './components';
import { useEffect } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <NewsFeed />,
        errorElement: <ErrorElement />,
      },

      {
        path: 'createNews',
        element: <CreateNewsFeed />,
        errorElement: <ErrorElement />,
      },
      {
        path: '/news/:id',
        element: <SingleNews />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'safety',
        element: <Issues />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'createIssue',
        element: <CreateIssue />,
        errorElement: <ErrorElement />,
      },
      {
        path: '/issues/:id',
        element: <SingleIssue />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'users',
        element: <Users />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'profile',
        element: <Profile />,
        errorElement: <ErrorElement />,
      },
    ],
  },
  {
    path: '/landing',
    element: (
      <PublicOnlyRoute>
        <Landing />
      </PublicOnlyRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/login',

    element: (
      <PublicOnlyRoute>
        <Login />
      </PublicOnlyRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: '/register',
    element: (
      // <PublicOnlyRoute>
      <Register />
      // </PublicOnlyRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: '/user/verify-email',
    element: <Verify />,
    errorElement: <ErrorElement />,
  },
  {
    path: '/user/forgot-password',
    element: (
      <PublicOnlyRoute>
        <ForgotPassword />
      </PublicOnlyRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/user/reset-password',
    element: (
      <PublicOnlyRoute>
        <ResetPassword />
      </PublicOnlyRoute>
    ),
    errorElement: <ErrorElement />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <InstallPWA />

      <RouterProvider router={router} />
    </>
  );
};
export default App;
