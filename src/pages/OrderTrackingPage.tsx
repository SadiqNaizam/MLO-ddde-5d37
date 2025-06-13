import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemedLoadingIndicator from '@/components/ThemedLoadingIndicator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Package, CookingPot, Bike, CheckCircle2, MapPin, ShoppingBag, HelpCircle } from 'lucide-react';

interface OrderStage {
  name: string;
  details: string;
  icon: React.ElementType;
  progress: number;
  time?: string; // Optional: timestamp for when this stage was completed/started
}

const orderStages: OrderStage[] = [
  { name: 'Order Placed', details: 'We have received your order.', icon: Package, progress: 25 },
  { name: 'Preparing Your Meal', details: 'The restaurant is working on your order.', icon: CookingPot, progress: 50 },
  { name: 'Out for Delivery', details: 'Your rider is on the way with your meal!', icon: Bike, progress: 75 },
  { name: 'Delivered', details: 'Enjoy your food!', icon: CheckCircle2, progress: 100 },
];

interface OrderDetails {
  id: string;
  estimatedDeliveryTime: string;
  actualDeliveryTime?: string;
  deliveryAddress: string;
  restaurantName: string;
  items: { name: string; quantity: number }[];
}

const OrderTrackingPage: React.FC = () => {
  console.log('OrderTrackingPage loaded');

  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    // Simulate fetching initial order data for a specific order ID (e.g., from URL params in a real app)
    const fetchOrderData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      setOrderDetails({
        id: 'FD12345XYZ',
        restaurantName: 'Pizza Palace',
        estimatedDeliveryTime: 'Approximately 35-45 minutes',
        deliveryAddress: '123 Main Street, Anytown, USA 12345',
        items: [
          { name: 'Pepperoni Pizza', quantity: 1 },
          { name: 'Garlic Knots', quantity: 1 },
          { name: 'Soda', quantity: 2 },
        ],
      });
      setCurrentStageIndex(0); // Start at 'Order Placed'
      setIsLoading(false);
    };

    fetchOrderData();
  }, []);

  useEffect(() => {
    if (isLoading || !orderDetails || currentStageIndex >= orderStages.length - 1) {
      // If still loading, no order details, or order is delivered, stop advancing.
      if (currentStageIndex === orderStages.length - 1 && orderDetails) {
        setOrderDetails(prev => prev ? { ...prev, actualDeliveryTime: new Date().toLocaleTimeString() } : null);
      }
      return;
    }

    // Simulate order progress
    const progressTimer = setTimeout(() => {
      setCurrentStageIndex(prevIndex => prevIndex + 1);
    }, 7000); // Advance stage every 7 seconds

    return () => clearTimeout(progressTimer);
  }, [isLoading, orderDetails, currentStageIndex]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <ThemedLoadingIndicator loadingText="Fetching your order details..." size={60} />
        </main>
        <Footer />
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center text-center p-8">
          <ShoppingBag size={64} className="text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Order Found</h2>
          <p className="text-muted-foreground mb-6">We couldn't find details for this order. It might have been completed or cancelled.</p>
          <Link to="/">
            <Button>Go to Homepage</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }
  
  const currentStage = orderStages[currentStageIndex];
  const progressValue = currentStage.progress;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">Track Your Order</CardTitle>
            <CardDescription>Order ID: {orderDetails.id} from {orderDetails.restaurantName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Status & ETA */}
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <currentStage.icon size={48} className="mx-auto mb-2 text-primary" />
              <h3 className="text-xl font-semibold">{currentStage.name}</h3>
              <p className="text-muted-foreground">{currentStage.details}</p>
              {currentStageIndex < orderStages.length - 1 && (
                 <p className="text-sm mt-1">Estimated Delivery: {orderDetails.estimatedDeliveryTime}</p>
              )}
              {currentStageIndex === orderStages.length - 1 && orderDetails.actualDeliveryTime && (
                 <p className="text-sm mt-1 font-medium text-green-600">Delivered at: {orderDetails.actualDeliveryTime}</p>
              )}
            </div>

            {/* Progress Bar */}
            <div>
              <Progress value={progressValue} className="w-full h-3" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Order Confirmed</span>
                <span>Delivered</span>
              </div>
            </div>

            <Separator />

            {/* Detailed Stages */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Order Journey</h4>
              {orderStages.map((stage, index) => (
                <div key={stage.name} className={`flex items-start space-x-3 ${index > currentStageIndex ? 'opacity-50' : ''}`}>
                  <div className={`mt-1 flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${index <= currentStageIndex ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {index < currentStageIndex ? <CheckCircle2 size={16} /> : <stage.icon size={14} />}
                  </div>
                  <div>
                    <p className={`font-medium ${index <= currentStageIndex ? 'text-foreground' : 'text-muted-foreground'}`}>{stage.name}</p>
                    <p className="text-sm text-muted-foreground">{stage.details}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator />

            {/* Delivery Information */}
            <div>
              <h4 className="font-semibold text-lg mb-2">Delivery Details</h4>
              <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-md">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Delivering To:</p>
                  <p className="text-sm text-muted-foreground">{orderDetails.deliveryAddress}</p>
                </div>
              </div>
            </div>
            
            {/* Placeholder for map if available */}
            {currentStageIndex === 2 && ( // Show "map" when out for delivery
                <div className="text-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                    <p className="text-sm text-muted-foreground">Your rider is on the way! Track their live location (map placeholder).</p>
                    <img src="https://via.placeholder.com/400x200?text=Live+Map+View+(Placeholder)" alt="Live map placeholder" className="mt-2 rounded-md mx-auto" />
                </div>
            )}

          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t">
            <Link to="/contact-support" className="w-full sm:w-auto"> {/* Assuming /contact-support could be a route */}
                <Button variant="outline" className="w-full">
                    <HelpCircle className="mr-2 h-4 w-4" /> Contact Support
                </Button>
            </Link>
            <Link to="/" className="w-full sm:w-auto">
                <Button className="w-full">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
                </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;