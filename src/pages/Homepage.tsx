import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import ThemedLoadingIndicator from '@/components/ThemedLoadingIndicator'; // Included as per layout_info

// Shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // For structuring sections

// Lucide Icons
import { Search, ArrowRight } from 'lucide-react';

// Placeholder data for components
const featuredRestaurants = [
  {
    id: '1',
    slug: 'pizza-palace-deluxe',
    name: 'Pizza Palace Deluxe',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
    cuisineTypes: ['Italian', 'Pizza', 'Fast Food'],
    rating: 4.5,
    deliveryTime: '25-35 min',
    specialOffer: '20% OFF',
  },
  {
    id: '2',
    slug: 'sushi-sensations',
    name: 'Sushi Sensations',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
    cuisineTypes: ['Japanese', 'Sushi', 'Healthy'],
    rating: 4.8,
    deliveryTime: '30-40 min',
  },
  {
    id: '3',
    slug: 'burger-bliss-joint',
    name: 'Burger Bliss Joint',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
    cuisineTypes: ['American', 'Burgers', 'Fries'],
    rating: 4.3,
    deliveryTime: '20-30 min',
  },
  {
    id: '4',
    slug: 'taco-fiesta-loca',
    name: 'Taco Fiesta Loca',
    imageUrl: 'https://images.unsplash.com/photo-1565299715199-866c917206bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGFjb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
    cuisineTypes: ['Mexican', 'Tacos', 'Spicy'],
    rating: 4.6,
    deliveryTime: '35-45 min',
    specialOffer: 'Free Guac',
  },
];

const editorsPicks = [
  {
    id: '5',
    slug: 'the-royal-curry-house',
    name: 'The Royal Curry House',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60',
    cuisineTypes: ['Indian', 'Curry', 'Vegetarian'],
    rating: 4.9,
    deliveryTime: '40-50 min',
  },
  {
    id: '6',
    slug: 'vegan-vibes-cafe',
    name: 'Vegan Vibes Cafe',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnYW4lMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
    cuisineTypes: ['Vegan', 'Healthy', 'Salads'],
    rating: 4.7,
    deliveryTime: '25-35 min',
    specialOffer: 'New Menu!',
  },
  {
    id: '7',
    slug: 'pasta-paradiso',
    name: 'Pasta Paradiso',
    imageUrl: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
    cuisineTypes: ['Italian', 'Pasta', 'Comfort Food'],
    rating: 4.4,
    deliveryTime: '30-40 min',
  },
    {
    id: '8',
    slug: 'breakfast-boulangerie',
    name: 'Breakfast Boulangerie',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJlYWtmYXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
    cuisineTypes: ['Breakfast', 'Bakery', 'Coffee'],
    rating: 4.8,
    deliveryTime: '15-25 min',
  },
];

const carouselImages = [
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80', alt: 'Delicious gourmet spread' },
  { src: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80', alt: 'Healthy and fresh breakfast bowl' },
  { src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80', alt: 'Colorful platter of various foods' },
  { src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80', alt: 'Tasty avocado toast' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80', alt: 'Delicious pizza with fresh toppings' },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section with Search */}
        <section 
          className="relative py-20 sm:py-28 md:py-32 text-center bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white overflow-hidden"
        >
          <div 
            className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1600&q=80')" }}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 drop-shadow-lg">
              Your Next Meal, Delivered.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
              Discover top-rated restaurants and the most delicious dishes, right at your fingertips.
            </p>
            <div className="max-w-xl mx-auto relative">
              <Input
                type="search"
                placeholder="Search restaurants, cuisines, or dishes..."
                className="w-full p-4 pl-5 pr-12 text-base sm:text-lg rounded-full shadow-lg border-transparent focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                aria-label="Search for food or restaurants"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
              A Feast for Your Eyes
            </h2>
            <Carousel 
              className="w-full max-w-5xl mx-auto"
              opts={{
                align: "start",
                loop: true,
              }}
              autoplayDelay={5000}
            >
              <CarouselContent>
                {carouselImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden rounded-lg shadow-md">
                        <CardContent className="flex aspect-[3/2] items-center justify-center p-0">
                           <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-12 hidden sm:flex" />
              <CarouselNext className="mr-12 hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* Featured Restaurants Section */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
                Popular Near You
              </h2>
              <Link to="/restaurant-listing">
                <Button variant="outline" className="text-orange-600 border-orange-500 hover:bg-orange-50 hover:text-orange-700">
                  View All Restaurants <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          </div>
        </section>

        {/* Editor's Picks Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
              Editor's Picks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {editorsPicks.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-orange-400 to-red-400">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Hungry for More?
            </h2>
            <p className="text-lg text-orange-100 mb-8 max-w-lg mx-auto">
              Explore thousands of local restaurants and discover your new favorite dish today.
            </p>
            <Link to="/restaurant-listing">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg px-10 py-6 text-lg font-semibold">
                Browse All Restaurants
              </Button>
            </Link>
          </div>
        </section>

        {/* 
          ThemedLoadingIndicator is included in layout_info. 
          It can be used conditionally when fetching data.
          Example: {isLoading && <ThemedLoadingIndicator loadingText="Loading amazing food..." />} 
        */}
        {/* <ThemedLoadingIndicator loadingText="Loading..." className="my-8" /> */}

      </main>

      <Footer />
    </div>
  );
};

export default Homepage;