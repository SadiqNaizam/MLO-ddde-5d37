import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, SlidersHorizontal } from 'lucide-react';

interface DishCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  customizable?: boolean; // To conditionally show customize button or alter its behavior
  // In a real app, these handlers would involve more complex logic (e.g., API calls, state updates)
  // For now, they will trigger toasts.
  onAddToCart?: (dish: { id: string; name: string; price: number }) => void;
  onCustomize?: (dishId: string) => void;
}

const DishCard: React.FC<DishCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  customizable = true, // Default to true, meaning customize button is shown
  onAddToCart,
  onCustomize,
}) => {
  const { toast } = useToast();
  console.log(`DishCard loaded for: ${name}`);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({ id, name, price });
    } else {
      toast({
        title: "Added to Cart!",
        description: `${name} has been added to your cart.`,
      });
    }
    // Potentially trigger animation towards AnimatedCartIcon here or in parent
    console.log(`Dish ${id} added to cart.`);
  };

  const handleCustomize = () => {
    if (onCustomize) {
      onCustomize(id);
    } else {
      toast({
        title: "Customize Dish",
        description: `Opening customization options for ${name}.`,
      });
    }
    console.log(`Customize dish ${id} clicked.`);
    // Parent component would typically open a Dialog here
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col group">
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || 'https://via.placeholder.com/400x225?text=Delicious+Dish'}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </AspectRatio>
      </CardHeader>

      <CardContent className="p-4 space-y-2 flex-grow">
        <CardTitle className="text-xl font-semibold line-clamp-2 group-hover:text-primary">
          {name}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
          ${price.toFixed(2)}
        </p>
      </CardContent>

      <CardFooter className="p-4 border-t bg-muted/20">
        <div className="flex w-full gap-2">
          {customizable && (
            <Button variant="outline" className="flex-1" onClick={handleCustomize}>
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Customize
            </Button>
          )}
          <Button className="flex-1" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DishCard;