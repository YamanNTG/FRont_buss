import { FaBus } from 'react-icons/fa';
import landingHero from '../assets/landing-hero.svg';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <FaBus className="h-8 w-8 text-primary text-primary-600" />
            <span className="text-xl font-bold">
              <span className="text-primary-600">T</span>ransit
              <span className="text-primary-600">T</span>ask
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              News, safety, rosters, all in one place.
            </h1>
            <p className="text-lg text-muted-foreground">
              Streamline your transit operations with our comprehensive platform
              designed for both management and drivers. Stay updated with the
              latest news, efficiently manage safety reports, and handle shift
              swaps and holiday requests—all in one intuitive interface. Making
              transit management simpler, safer, and more efficient.
            </p>
            <p className="text-2xl text-red-500">
              Registration is possible only via invitation from the organization
              admin
            </p>
            {/*Button layout */}
            <div className="flex flex-col space-y-4 w-full">
              <Button
                asChild
                className=" bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full h-64 sm:h-96 md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-3xl overflow-hidden shadow-xl">
            <img
              src={landingHero}
              alt="Task Management Dashboard"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
