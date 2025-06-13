import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DishCard from '@/components/DishCard';
import ThemedLoadingIndicator from '@/components/ThemedLoadingIndicator';

// Shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// Lucide Icons
import { Star, Clock, Utensils, ChevronRightIcon, ShoppingCart, Edit3 } from 'lucide-react';

// Types for placeholder data
interface CustomizationOptionChoice {
  id: string;
  label: string;
  priceChange?: number;
}
interface CustomizationOption {
  id: string;
  title: string;
  type: 'radio' | 'checkbox';
  choices: CustomizationOptionChoice[];
  required?: boolean;
}
interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  customizable: boolean;
  customizationOptions?: CustomizationOption[];
}
interface MenuCategory {
  id: string;
  name: string;
  dishes: Dish[];
}
interface RestaurantData {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  description: string;
  cuisineTypes: string[];
  categories: MenuCategory[];
}

// Placeholder Restaurant Data
const placeholderRestaurantData: RestaurantData = {
  id: 'gourmet-place-123',
  slug: 'the-gourmet-place',
  name: 'The Gourmet Place',
  logoUrl: 'https://via.placeholder.com/100?text=GP', // Replace with actual logo
  bannerImageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop', // Replace with actual banner
  rating: 4.7,
  reviewCount: 350,
  deliveryTime: '30-45 min',
  description: 'Experience the finest culinary creations, crafted with passion and the freshest ingredients. A journey for your taste buds.',
  cuisineTypes: ['Modern European', 'Fusion', 'Fine Dining'],
  categories: [
    {
      id: 'appetizers',
      name: 'Appetizers',
      dishes: [
        { id: 'd1', name: 'Crispy Calamari Rings', description: 'Lightly battered calamari served with a zesty lemon aioli.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1585246750997-f96199633e07?q=80&w=600&auto=format&fit=crop', customizable: false },
        { id: 'd2', name: 'Caprese Skewers', description: 'Cherry tomatoes, fresh mozzarella, and basil, drizzled with balsamic glaze.', price: 9.50, imageUrl: 'https://images.unsplash.com/photo-1579901751937-9490a391f196?q=80&w=600&auto=format&fit=crop', customizable: false },
      ],
    },
    {
      id: 'main-courses',
      name: 'Main Courses',
      dishes: [
        {
          id: 'd3',
          name: 'Signature Steak Frites',
          description: 'Grilled 8oz sirloin steak with hand-cut fries and peppercorn sauce.',
          price: 28.00,
          imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=600&auto=format&fit=crop',
          customizable: true,
          customizationOptions: [
            { id: 'c1', title: 'Steak Doneness', type: 'radio', required: true, choices: [{ id: 'c1o1', label: 'Rare' }, { id: 'c1o2', label: 'Medium Rare' }, { id: 'c1o3', label: 'Medium' }, { id: 'c1o4', label: 'Well Done' }] },
            { id: 'c2', title: 'Sauce Choice', type: 'radio', required: true, choices: [{ id: 'c2o1', label: 'Peppercorn' }, { id: 'c2o2', label: 'Mushroom' }, { id: 'c2o3', label: 'Bearnaise (+ $2.00)', priceChange: 2 }] },
            { id: 'c3', title: 'Add Ons', type: 'checkbox', choices: [{ id: 'c3o1', label: 'Grilled Onions (+ $1.50)', priceChange: 1.5 }, { id: 'c3o2', label: 'Fried Egg (+ $2.00)', priceChange: 2 }] },
          ],
        },
        { id: 'd4', name: 'Pan-Seared Salmon', description: 'With asparagus and lemon-butter sauce.', price: 24.50, imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop', customizable: false },
        { id: 'd5', name: 'Truffle Risotto', description: 'Creamy Arborio rice with black truffle and Parmesan.', price: 22.00, imageUrl: 'https://images.unsplash.com/photo-1595908129744-57f3c1af088d?q=80&w=600&auto=format&fit=crop', customizable: true, customizationOptions: [{id: 'c4', title: 'Add Protein', type: 'radio', choices: [{id: 'c4o1', label: 'No Protein'}, {id: 'c4o2', label: 'Chicken (+ $4.00)', priceChange: 4}, {id: 'c4o3', label: 'Shrimp (+ $6.00)', priceChange: 6}] }] },
      ],
    },
    {
      id: 'desserts',
      name: 'Desserts',
      dishes: [
        { id: 'd6', name: 'Chocolate Lava Cake', description: 'Molten chocolate cake with a scoop of vanilla ice cream.', price: 10.00, imageUrl: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b92?q=80&w=600&auto=format&fit=crop', customizable: false },
        { id: 'd7', name: 'Classic Tiramisu', description: 'Ladyfingers, mascarpone, espresso, and cocoa.', price: 9.00, imageUrl: 'https://images.unsplash.com/photo-1571877275904-78eb90f17a17?q=80&w=600&auto=format&fit=crop', customizable: false },
      ],
    },
  ],
};


const RestaurantMenuPage = () => {
  console.log('RestaurantMenuPage loaded');
  // const [searchParams] = useSearchParams();
  // const restaurantSlug = searchParams.get('restaurant');
  // In a real app, you would fetch restaurant data based on restaurantSlug
  // For this demo, we'll use placeholder data.
  const [restaurantData, setRestaurantData] = useState<RestaurantData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCustomizeDialogOpen, setIsCustomizeDialogOpen] = useState(false);
  const [selectedDishForCustomization, setSelectedDishForCustomization] = useState<Dish | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching data
    setIsLoading(true);
    const timer = setTimeout(() => {
      setRestaurantData(placeholderRestaurantData);
      setIsLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const handleCustomizeDish = (dishId: string) => {
    const dish = restaurantData?.categories
      .flatMap(cat => cat.dishes)
      .find(d => d.id === dishId);
    if (dish && dish.customizable) {
      setSelectedDishForCustomization(dish);
      setIsCustomizeDialogOpen(true);
    } else {
        toast({
            title: "Not Customizable",
            description: "This dish does not have customization options.",
            variant: "default"
        });
    }
  };

  const handleAddToCartFromPage = (dish: { id: string; name: string; price: number }) => {
     // In a real app, this would interact with a global cart state/context
    toast({
      title: "Added to Cart!",
      description: `${dish.name} has been added to your cart.`,
    });
    console.log(`Dish ${dish.id} (${dish.name}) added to cart from page function.`);
  };
  
  const handleCustomizationSubmit = () => {
    if (!selectedDishForCustomization) return;
    // Logic to handle selected customization options would go here
    // For now, just add the base dish to cart and show a toast
    handleAddToCartFromPage({
        id: selectedDishForCustomization.id,
        name: selectedDishForCustomization.name,
        price: selectedDishForCustomization.price // Note: price might change based on options
    });
    toast({
        title: "Customized Item Added!",
        description: `${selectedDishForCustomization.name} (customized) added to cart.`,
    });
    setIsCustomizeDialogOpen(false);
    setSelectedDishForCustomization(null);
  };


  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <ThemedLoadingIndicator loadingText="Loading restaurant menu..." size={60} />
        </div>
        <Footer />
      </div>
    );
  }

  if (!restaurantData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center text-center p-8">
          <Card>
            <CardHeader><CardTitle>Restaurant Not Found</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Sorry, we couldn't find the restaurant you're looking for.</p>
              <Button asChild>
                <Link to="/restaurant-listing">Browse Other Restaurants</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />

      <main className="flex-grow">
        {/* Hero/Banner Section */}
        <section className="relative h-64 md:h-80 lg:h-96 w-full">
          <img
            src={restaurantData.bannerImageUrl}
            alt={`${restaurantData.name} banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-end p-4 md:p-8">
             <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-white shadow-lg -mb-10 md:-mb-12">
                <AvatarImage src={restaurantData.logoUrl} alt={`${restaurantData.name} logo`} />
                <AvatarFallback className="text-3xl">
                  {restaurantData.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
          </div>
        </section>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16 pb-12">
          {/* Breadcrumbs & Restaurant Info */}
          <div className="mb-8">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRightIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/restaurant-listing">Restaurants</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRightIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{restaurantData.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {restaurantData.name}
                </h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">{restaurantData.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" />
                    <span>{restaurantData.rating.toFixed(1)} ({restaurantData.reviewCount} reviews)</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-1" />
                    <span>{restaurantData.deliveryTime}</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex flex-wrap gap-1.5">
                    {restaurantData.cuisineTypes.map(cuisine => (
                        <Badge key={cuisine} variant="secondary">{cuisine}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              {/* Action buttons like "Favorite" or "Share" could go here */}
            </div>
          </div>

          {/* Menu Tabs */}
          <Tabs defaultValue={restaurantData.categories[0]?.id || 'all'} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:w-auto mb-6 bg-slate-100 dark:bg-slate-800">
              {restaurantData.categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="capitalize text-sm sm:text-base">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {restaurantData.categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.dishes.map((dish) => (
                    <DishCard
                      key={dish.id}
                      id={dish.id}
                      name={dish.name}
                      description={dish.description}
                      price={dish.price}
                      imageUrl={dish.imageUrl}
                      customizable={dish.customizable}
                      onAddToCart={() => handleAddToCartFromPage(dish)}
                      onCustomize={() => handleCustomizeDish(dish.id)}
                    />
                  ))}
                </div>
                {category.dishes.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No dishes in this category yet.</p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      {/* Customization Dialog */}
      {selectedDishForCustomization && (
        <Dialog open={isCustomizeDialogOpen} onOpenChange={setIsCustomizeDialogOpen}>
          <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-2xl">Customize: {selectedDishForCustomization.name}</DialogTitle>
              <DialogDescription>
                Make it just the way you like it. Base Price: ${selectedDishForCustomization.price.toFixed(2)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-grow overflow-y-auto pr-2 space-y-6 py-4">
              {selectedDishForCustomization.customizationOptions?.map(optionGroup => (
                <div key={optionGroup.id}>
                  <h4 className="font-semibold mb-2 text-lg text-gray-800 dark:text-gray-200">{optionGroup.title}{optionGroup.required && <span className="text-red-500 ml-1">*</span>}</h4>
                  {optionGroup.type === 'radio' && (
                    <RadioGroup defaultValue={optionGroup.choices[0]?.id}>
                      {optionGroup.choices.map(choice => (
                        <div key={choice.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                          <RadioGroupItem value={choice.id} id={`${optionGroup.id}-${choice.id}`} />
                          <Label htmlFor={`${optionGroup.id}-${choice.id}`} className="flex-grow cursor-pointer">
                            {choice.label}
                            {choice.priceChange && (
                              <span className="text-xs text-green-600 dark:text-green-400 ml-1">
                                (+${choice.priceChange.toFixed(2)})
                              </span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  {optionGroup.type === 'checkbox' && (
                    <div className="space-y-2">
                      {optionGroup.choices.map(choice => (
                        <div key={choice.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                          <Checkbox id={`${optionGroup.id}-${choice.id}`} />
                          <Label htmlFor={`${optionGroup.id}-${choice.id}`} className="flex-grow cursor-pointer">
                            {choice.label}
                            {choice.priceChange && (
                              <span className="text-xs text-green-600 dark:text-green-400 ml-1">
                                (+${choice.priceChange.toFixed(2)})
                              </span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                  <Separator className="my-4"/>
                </div>
              ))}
              {(!selectedDishForCustomization.customizationOptions || selectedDishForCustomization.customizationOptions.length === 0) && (
                <p className="text-muted-foreground">No customization options available for this item.</p>
              )}
            </div>

            <DialogFooter className="mt-auto pt-4 border-t">
                <Button variant="outline" onClick={() => setIsCustomizeDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCustomizationSubmit} className="bg-orange-500 hover:bg-orange-600 text-white">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;