import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For any direct links if needed, though components handle most

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import FilterSidebar from '@/components/FilterSidebar';
import ThemedLoadingIndicator from '@/components/ThemedLoadingIndicator';

// Shadcn/ui Components
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Search } from 'lucide-react';

interface Restaurant {
  id: string | number;
  slug: string;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number;
  deliveryTime: string;
  specialOffer?: string;
}

const sampleRestaurants: Restaurant[] = [
  {
    id: '1',
    slug: 'the-pizza-place',
    name: 'The Pizza Place',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Italian', 'Pizza', 'Fast Food'],
    rating: 4.5,
    deliveryTime: '25-35 min',
    specialOffer: '20% OFF',
  },
  {
    id: '2',
    slug: 'burger-heaven',
    name: 'Burger Heaven',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['American', 'Burgers', 'Fries'],
    rating: 4.2,
    deliveryTime: '20-30 min',
  },
  {
    id: '3',
    slug: 'sushi-central',
    name: 'Sushi Central',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Japanese', 'Sushi', 'Seafood'],
    rating: 4.8,
    deliveryTime: '30-40 min',
    specialOffer: 'Free Edamame',
  },
  {
    id: '4',
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFjb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Mexican', 'Tacos', 'Burritos'],
    rating: 4.3,
    deliveryTime: '20-35 min',
  },
  {
    id: '5',
    slug: 'curry-kingdom',
    name: 'Curry Kingdom',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Indian', 'Curry', 'Biryani'],
    rating: 4.6,
    deliveryTime: '35-45 min',
    specialOffer: '15% off Combos',
  },
  {
    id: '6',
    slug: 'salad-spot',
    name: 'Salad Spot',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FsYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Healthy', 'Salads', 'Wraps'],
    rating: 4.0,
    deliveryTime: '15-25 min',
  },
];

const ITEMS_PER_PAGE = 6; // For pagination example, though displaying all for simplicity now

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Simulate fetching data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setRestaurants(sampleRestaurants);
      setIsLoading(false);
    }, 1500); // Simulate network delay
  }, []);

  // In a real app, filtering would happen here based on searchQuery and FilterSidebar state
  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);
  // For this example, we'll show all filtered restaurants.
  // A real implementation would slice:
  // const paginatedRestaurants = filteredRestaurants.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add scroll to top or other effects if needed
    window.scrollTo(0, 0);
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section aria-labelledby="restaurant-listing-title">
          <h1 id="restaurant-listing-title" className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            Explore Restaurants
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find your next favorite meal from our curated list of restaurants.
          </p>

          {/* Search and Filter Controls */}
          <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow sticky top-20 z-40 md:top-24"> {/* Adjusted top for sticky header */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search restaurants by name, cuisine..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search restaurants"
                />
              </div>
              <FilterSidebar /> {/* FilterSidebar component includes its own trigger button */}
            </div>
          </div>

          {isLoading ? (
            <ThemedLoadingIndicator loadingText="Fetching amazing restaurants..." className="my-16" />
          ) : filteredRestaurants.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {/* In a real app, use paginatedRestaurants here */}
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    id={restaurant.id}
                    slug={restaurant.slug}
                    name={restaurant.name}
                    imageUrl={restaurant.imageUrl}
                    cuisineTypes={restaurant.cuisineTypes}
                    rating={restaurant.rating}
                    deliveryTime={restaurant.deliveryTime}
                    specialOffer={restaurant.specialOffer}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => { e.preventDefault(); if (currentPage > 1) handlePageChange(currentPage - 1); }}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          aria-disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        // Basic pagination logic for showing limited page numbers
                        // For more complex scenarios (e.g. many pages), add ellipsis logic
                        if (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => { e.preventDefault(); handlePageChange(pageNum); }}
                                isActive={currentPage === pageNum}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          (pageNum === currentPage - 2 && currentPage > 3) ||
                          (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                        ) {
                          return <PaginationEllipsis key={`ellipsis-${pageNum}`} />;
                        }
                        return null;
                      })}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) handlePageChange(currentPage + 1); }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          aria-disabled={currentPage === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">No Restaurants Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;