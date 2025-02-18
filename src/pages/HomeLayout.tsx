import { Navbar } from '@/components';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
