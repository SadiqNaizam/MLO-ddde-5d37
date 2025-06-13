import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";

const Footer: React.FC = () => {
  console.log('Footer loaded');

  const footerLinks = [
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact Support', path: '/contact-support' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];

  return (
    <footer className="bg-background border-t border-border/40 text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <Link to="/" className="text-2xl font-bold text-primary">
              FoodApp
            </Link>
            <p className="text-sm mt-1">Delivering delight, one bite at a time.</p>
          </div>
          
          <nav className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-x-6 gap-y-2 text-center md:col-span-2 md:justify-end">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <Separator className="my-6" />
        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} FoodApp. All rights reserved.</p>
          <p className="mt-1">Crafted with care for food lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;