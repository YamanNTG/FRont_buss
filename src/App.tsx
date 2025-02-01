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
} from './pages';

import { ErrorElement } from './components';
import Verify from './pages/Verify';
import { ProtectedRoute, PublicOnlyRoute } from './components';

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
        path: ':id',
        element: <SingleNews />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'issues',
        element: <Issues />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'createIssue',
        element: <CreateIssue />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'holidaySwap',
        element: <HolidaySwap />,
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
      <PublicOnlyRoute>
        <Register />
      </PublicOnlyRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: '/user/verify-email',
    element: <Verify />,
    errorElement: <ErrorElement />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};
export default App;
