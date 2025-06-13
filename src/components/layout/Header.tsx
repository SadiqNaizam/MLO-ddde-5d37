import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedCartIcon from '@/components/AnimatedCartIcon'; // Assuming this is the correct path
import { UtensilsCrossed, HomeIcon, StoreIcon, SearchIcon, UserCircle2Icon } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header component loaded');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and App Name */}
        <Link to="/" className="flex items-center space-x-2" aria-label="Homepage">
          <UtensilsCrossed className="h-7 w-7 text-primary" />
          <span className="hidden text-xl font-bold sm:inline-block">FoodApp</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <HomeIcon className="mr-1 inline-block h-4 w-4" />
            Home
          </Link>
          <Link
            to="/restaurant-listing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <StoreIcon className="mr-1 inline-block h-4 w-4" />
            Browse Restaurants
          </Link>
        </nav>

        {/* Right-side Icons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <SearchIcon className="h-5 w-5" />
          </Button>
          
          <Link to="/cart" aria-label="View Cart">
            <AnimatedCartIcon />
          </Link>

          <Link to="/user-profile" aria-label="User Profile">
            <Button variant="ghost" size="icon">
              <UserCircle2Icon className="h-5 w-5" />
            </Button>
          </Link>

          {/* Placeholder for Mobile Menu Trigger - could be enhanced with Sheet */}
          {/* <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;