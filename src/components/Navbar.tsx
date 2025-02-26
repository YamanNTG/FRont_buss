import { FaBus } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from '@/utils/hooks';
import { logoutUser } from '@/features/thunks/authThunk';
import { Button } from '@/components/ui/button';

type NavItem = {
  name: string;
  path: string;
};

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const navItems: NavItem[] = [
    { name: 'News', path: '/' },
    { name: 'Safety', path: '/safety' },
    ...(user?.role === 'admin' ? [{ name: 'Users', path: '/users' }] : []),
  ];

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate(0);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="w-full bg-background border-b border-border">
      <div className="relative w-full">
        {/* Main navbar content */}
        <div className="flex justify-between h-16 items-center w-full">
          {/* Left column - Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <FaBus className="h-8 w-8 text-primary text-primary-600" />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link relative px-3 py-2 transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Profile and Logout - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => navigate('/createIssue')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Create Issue
            </Button>
            <Link
              to="/profile"
              className={`nav-link p-2 rounded-full transition-colors duration-200 ${
                location.pathname === '/profile'
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              aria-label="Profile"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={user?.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <button
              disabled={isLoading}
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
            >
              Logout
            </button>
          </div>
          {/* Mobile create issue button */}
          <Button
            onClick={() => navigate('/createIssue')}
            className="bg-blue-600 hover:bg-blue-700 text-white md:hidden font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Create Issue
          </Button>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`${
            isMenuOpen
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0'
          } md:hidden absolute top-16 right-0 left-0 bg-background border-b border-border transition-all duration-300 ease-in-out z-50`}
        >
          <div className="flex flex-col items-center px-4 py-3">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col items-center w-full space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`nav-link text-center w-full px-3 py-2 rounded-md transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Profile Link */}
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className={`mt-3 flex items-center justify-center w-full px-3 py-2 rounded-md transition-colors duration-200 ${
                location.pathname === '/profile'
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <CgProfile className="h-5 w-5 mr-2 text-primary text-primary-600" />
            </Link>

            {/* Mobile Logout Button */}
            <button
              disabled={isLoading}
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="mt-3 text-center w-full px-3 py-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
