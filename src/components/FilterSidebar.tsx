import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from 'lucide-react';

interface FilterOptions {
  cuisine: string[];
  dietary: string[];
  priceRange: [number, number];
  deliveryTime: string;
  rating: number;
}

const initialFilterOptions: FilterOptions = {
  cuisine: [],
  dietary: [],
  priceRange: [0, 100],
  deliveryTime: '',
  rating: 0,
};

const cuisineTypes = [
  { id: 'italian', label: 'Italian' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'mexican', label: 'Mexican' },
  { id: 'indian', label: 'Indian' },
  { id: 'japanese', label: 'Japanese' },
  { id: 'thai', label: 'Thai' },
];

const dietaryNeeds = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'halal', label: 'Halal' },
];

const deliveryTimeOptions = [
  { value: 'under_30', label: 'Under 30 mins' },
  { value: '30_45', label: '30-45 mins' },
  { value: '45_60', label: '45-60 mins' },
  { value: 'any', label: 'Any' },
];

const ratingOptions = [
  { value: 5, label: '5 Stars' },
  { value: 4, label: '4 Stars & Up' },
  { value: 3, label: '3 Stars & Up' },
  { value: 2, label: '2 Stars & Up' },
  { value: 1, label: '1 Star & Up' },
];

const FilterSidebar: React.FC = () => {
  console.log('FilterSidebar loaded');
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(initialFilterOptions);

  const handleCuisineChange = (cuisineId: string, checked: boolean | 'indeterminate') => {
    setFilters(prev => ({
      ...prev,
      cuisine: checked ? [...prev.cuisine, cuisineId] : prev.cuisine.filter(c => c !== cuisineId),
    }));
  };

  const handleDietaryChange = (dietaryId: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      dietary: checked ? [...prev.dietary, dietaryId] : prev.dietary.filter(d => d !== dietaryId),
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: [value[0], value[1]] }));
  };

  const handleDeliveryTimeChange = (value: string) => {
    setFilters(prev => ({ ...prev, deliveryTime: value }));
  };

  const handleRatingChange = (value: string) => {
    setFilters(prev => ({ ...prev, rating: parseInt(value, 10) }));
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    // In a real app, you would pass these filters to a parent component or context
    setIsOpen(false); // Close sidebar after applying
  };

  const resetFilters = () => {
    console.log("Resetting filters");
    setFilters(initialFilterOptions);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Filter Options</SheetTitle>
          <SheetDescription>
            Refine your search for the perfect meal.
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="flex-grow pr-6 -mr-6"> {/* Negative margin to counteract ScrollArea padding */}
          <div className="space-y-6">
            {/* Cuisine Type */}
            <div>
              <h4 className="font-semibold mb-2">Cuisine Type</h4>
              <div className="space-y-2">
                {cuisineTypes.map(cuisine => (
                  <div key={cuisine.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cuisine-${cuisine.id}`}
                      checked={filters.cuisine.includes(cuisine.id)}
                      onCheckedChange={(checked) => handleCuisineChange(cuisine.id, checked)}
                    />
                    <Label htmlFor={`cuisine-${cuisine.id}`} className="font-normal cursor-pointer">
                      {cuisine.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Dietary Needs */}
            <div>
              <h4 className="font-semibold mb-2">Dietary Needs</h4>
              <div className="space-y-3">
                {dietaryNeeds.map(diet => (
                  <div key={diet.id} className="flex items-center justify-between">
                    <Label htmlFor={`diet-${diet.id}`} className="font-normal cursor-pointer">
                      {diet.label}
                    </Label>
                    <Switch
                      id={`diet-${diet.id}`}
                      checked={filters.dietary.includes(diet.id)}
                      onCheckedChange={(checked) => handleDietaryChange(diet.id, checked)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
              <h4 className="font-semibold mb-2">Price Range</h4>
              <Slider
                defaultValue={[0, 100]}
                min={0}
                max={100}
                step={5}
                value={filters.priceRange}
                onValueChange={handlePriceChange}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>

            <Separator />

            {/* Delivery Time */}
            <div>
              <h4 className="font-semibold mb-2">Delivery Time</h4>
              <Select onValueChange={handleDeliveryTimeChange} value={filters.deliveryTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery time" />
                </SelectTrigger>
                <SelectContent>
                  {deliveryTimeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Rating */}
            <div>
              <h4 className="font-semibold mb-2">Minimum Rating</h4>
              <RadioGroup
                value={filters.rating.toString()}
                onValueChange={handleRatingChange}
                className="space-y-1"
              >
                {ratingOptions.map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value.toString()} id={`rating-${option.value}`} />
                    <Label htmlFor={`rating-${option.value}`} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="rating-any" />
                    <Label htmlFor="rating-any" className="font-normal cursor-pointer">Any Rating</Label>
                  </div>
              </RadioGroup>
            </div>
          </div>
        </ScrollArea>
        <Separator className="my-4" />
        <SheetFooter className="flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" onClick={resetFilters} className="w-full sm:w-auto">
            Reset Filters
          </Button>
          <Button onClick={applyFilters} className="w-full sm:w-auto">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSidebar;