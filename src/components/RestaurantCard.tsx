import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string | number;
  slug: string; // Used for navigation, e.g., /restaurant-menu?restaurant={slug}
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number; // e.g., 4.7
  deliveryTime: string; // e.g., "25-35 min"
  specialOffer?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  slug,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime,
  specialOffer,
}) => {
  console.log('RestaurantCard loaded for:', name, 'with slug:', slug);

  return (
    <Link 
      to={`/restaurant-menu?restaurant=${slug}`} 
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-xl"
      aria-label={`View menu for ${name}`}
    >
      <Card className="w-full overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col h-full">
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Delicious+Food'}
              alt={`Promotional image for ${name}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
          {specialOffer && (
            <Badge
              variant="destructive" // Using destructive for high visibility, assuming it fits "special offer"
              className="absolute top-3 right-3 text-xs px-2 py-1 shadow-md"
            >
              {specialOffer}
            </Badge>
          )}
        </div>

        <CardContent className="p-4 space-y-3 flex-grow flex flex-col">
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
              {name}
            </h3>
            {cuisineTypes && cuisineTypes.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {cuisineTypes.slice(0, 3).map((cuisine, index) => (
                  <Badge key={index} variant="secondary" className="text-xs font-medium">
                    {cuisine}
                  </Badge>
                ))}
                {cuisineTypes.length > 3 && (
                  <Badge variant="outline" className="text-xs font-medium">
                    +{cuisineTypes.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                <span className="font-medium">{rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-500 mr-1.5" />
                <span>{deliveryTime}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;