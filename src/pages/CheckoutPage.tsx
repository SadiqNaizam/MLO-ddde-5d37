import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemedLoadingIndicator from '@/components/ThemedLoadingIndicator';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Lucide Icons
import { MapPin, CreditCard, ShoppingCart, PackageCheck, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  addressLine1: z.string().min(5, "Address is required."),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required."),
  postalCode: z.string().min(3, "Postal code is required.").regex(/^\S+$/, "Postal code cannot contain spaces."),
  country: z.string().min(2, "Country is required."),
  phoneNumber: z.string().min(7, "Phone number is required.").regex(/^\+?[0-9\s-()]+$/, "Invalid phone number format."),
  saveAddress: z.boolean().default(false),

  paymentMethod: z.enum(['creditCard', 'paypal', 'googlePay'], {
    required_error: "Please select a payment method.",
  }),
  // Dummy fields for credit card if selected, not heavily validated for this example
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(), // MM/YY
  cardCVC: z.string().optional(),
  savePaymentInfo: z.boolean().default(false),

  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions to place the order.",
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
];

const paymentOptions = [
  { value: "creditCard", label: "Credit / Debit Card", icon: CreditCard },
  { value: "paypal", label: "PayPal", icon: CreditCard }, // Replace with actual PayPal icon if available
  { value: "googlePay", label: "Google Pay", icon: CreditCard }, // Replace with actual Google Pay icon if available
];

const mockCartItems = [
  { id: 'dish1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://via.placeholder.com/80x80?text=Pizza' },
  { id: 'dish2', name: 'Coca-Cola', price: 2.50, quantity: 2, imageUrl: 'https://via.placeholder.com/80x80?text=Coke' },
];
const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const deliveryFee = 3.00;
const taxRate = 0.08; // 8%
const taxes = subtotal * taxRate;
const orderTotal = subtotal + deliveryFee + taxes;


const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      postalCode: '',
      country: '',
      phoneNumber: '',
      saveAddress: false,
      paymentMethod: undefined,
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVC: '',
      savePaymentInfo: false,
      agreeToTerms: false,
    },
  });

  const { watch } = form;
  const selectedPaymentMethod = watch('paymentMethod');

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof CheckoutFormData)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ['fullName', 'addressLine1', 'city', 'postalCode', 'country', 'phoneNumber'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['paymentMethod'];
      if (selectedPaymentMethod === 'creditCard') {
        // Add basic card field validation triggers if desired, though schema handles final submit
        // For simplicity, we are not making these strictly required for step progression here.
      }
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0); // Scroll to top on step change
    } else {
      toast.error("Please correct the errors before proceeding.");
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0); // Scroll to top on step change
  };

  const onSubmit = async (data: CheckoutFormData) => {
    if (currentStep !== 3) return; // Only submit on the last step

    console.log('Checkout Data:', data);
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    toast.success(
        <div className="flex items-center">
            <PackageCheck className="mr-2 h-5 w-5 text-green-500" />
            <span>Order placed successfully! Your order ID is #12345.</span>
        </div>
    );
    navigate('/order-tracking?orderId=12345'); // Navigate to order tracking page (route from App.tsx)
  };

  console.log('CheckoutPage loaded');

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Delivery Address
        return (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center"><MapPin className="mr-2 h-6 w-6 text-primary" />Delivery Address</CardTitle>
              <CardDescription>Where should we send your delicious food?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField control={form.control} name="fullName" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              <FormField control={form.control} name="addressLine1" render={({ field }) => ( <FormItem> <FormLabel>Address Line 1</FormLabel> <FormControl><Input placeholder="123 Main St" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              <FormField control={form.control} name="addressLine2" render={({ field }) => ( <FormItem> <FormLabel>Address Line 2 (Optional)</FormLabel> <FormControl><Input placeholder="Apartment, suite, etc." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="city" render={({ field }) => ( <FormItem> <FormLabel>City</FormLabel> <FormControl><Input placeholder="Foodville" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="postalCode" render={({ field }) => ( <FormItem> <FormLabel>Postal Code</FormLabel> <FormControl><Input placeholder="F00 D4P" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              </div>
              <FormField control={form.control} name="country" render={({ field }) => (
                <FormItem> <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger></FormControl>
                    <SelectContent> {countries.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)} </SelectContent>
                  </Select> <FormMessage /> </FormItem>
              )} />
              <FormField control={form.control} name="phoneNumber" render={({ field }) => ( <FormItem> <FormLabel>Phone Number</FormLabel> <FormControl><Input type="tel" placeholder="+1 (555) 123-4567" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              <FormField control={form.control} name="saveAddress" render={({ field }) => ( <FormItem className="flex flex-row items-start space-x-3 space-y-0"> <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl> <div className="space-y-1 leading-none"> <FormLabel>Save this address for future orders</FormLabel> </div> </FormItem> )} />
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleNextStep}>Next: Payment <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </CardFooter>
          </Card>
        );
      case 2: // Payment Method
        return (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center"><CreditCard className="mr-2 h-6 w-6 text-primary" />Payment Method</CardTitle>
              <CardDescription>Choose your preferred payment option.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                <FormItem className="space-y-3"> <FormLabel>Select Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                      {paymentOptions.map(option => (
                        <FormItem key={option.value} className="flex items-center space-x-3 space-y-0 p-3 border rounded-md hover:bg-muted/50 transition-colors">
                          <FormControl><RadioGroupItem value={option.value} /></FormControl>
                          <Label htmlFor={option.value} className="font-normal flex items-center cursor-pointer">
                            <option.icon className="mr-2 h-5 w-5 text-muted-foreground" /> {option.label}
                          </Label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl> <FormMessage /> </FormItem>
              )} />
              {selectedPaymentMethod === 'creditCard' && (
                <div className="space-y-4 p-4 border rounded-md bg-muted/20">
                  <p className="text-sm font-medium text-foreground">Enter Card Details (Dummy fields)</p>
                  <FormField control={form.control} name="cardName" render={({ field }) => (<FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input placeholder="JOHN DOE" {...field} /></FormControl></FormItem>)} />
                  <FormField control={form.control} name="cardNumber" render={({ field }) => (<FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="**** **** **** 1234" {...field} /></FormControl></FormItem>)} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="cardExpiry" render={({ field }) => (<FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="cardCVC" render={({ field }) => (<FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl></FormItem>)} />
                  </div>
                </div>
              )}
              <FormField control={form.control} name="savePaymentInfo" render={({ field }) => ( <FormItem className="flex flex-row items-start space-x-3 space-y-0"> <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl> <div className="space-y-1 leading-none"> <FormLabel>Save payment information for future orders</FormLabel> </div> </FormItem> )} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}><ArrowLeft className="mr-2 h-4 w-4" /> Back: Address</Button>
              <Button onClick={handleNextStep}>Next: Review Order <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </CardFooter>
          </Card>
        );
      case 3: // Review Order
        const formData = form.getValues();
        return (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center"><ShoppingCart className="mr-2 h-6 w-6 text-primary" />Review Your Order</CardTitle>
              <CardDescription>Please confirm your order details before placing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Delivery To:</h3>
                <div className="text-sm text-muted-foreground p-3 border rounded-md">
                  <p><strong>{formData.fullName}</strong></p>
                  <p>{formData.addressLine1}{formData.addressLine2 ? `, ${formData.addressLine2}` : ''}</p>
                  <p>{formData.city}, {formData.postalCode}, {formData.country}</p>
                  <p>Phone: {formData.phoneNumber}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Payment Method:</h3>
                <p className="text-sm text-muted-foreground p-3 border rounded-md">
                  {paymentOptions.find(p => p.value === formData.paymentMethod)?.label || 'Not selected'}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Summary:</h3>
                <div className="space-y-2">
                  {mockCartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm p-2 border-b last:border-b-0">
                       <div className="flex items-center">
                        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-3" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t space-y-1 text-sm">
                  <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Delivery Fee:</span><span>${deliveryFee.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Taxes ({(taxRate * 100).toFixed(0)}%):</span><span>${taxes.toFixed(2)}</span></div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg"><span>Order Total:</span><span>${orderTotal.toFixed(2)}</span></div>
                </div>
              </div>
              <Separator />
              <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                  <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} id="terms" /></FormControl>
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="terms" className="text-sm font-normal">
                      I agree to the <Link to="/terms-of-service" className="text-primary hover:underline">Terms and Conditions</Link> and <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
                    </Label>
                    <FormMessage />
                  </div>
                </FormItem>
              )} />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button variant="outline" onClick={handlePrevStep} disabled={isLoading}><ArrowLeft className="mr-2 h-4 w-4" /> Back: Payment</Button>
              <Button type="submit" disabled={isLoading || !form.watch('agreeToTerms')} size="lg">
                {isLoading ? <ThemedLoadingIndicator size={20} className="p-0 mr-2" /> : <ShieldCheck className="mr-2 h-5 w-5" />}
                {isLoading ? 'Placing Order...' : `Place Order ($${orderTotal.toFixed(2)})`}
              </Button>
            </CardFooter>
          </Card>
        );
      default:
        return null;
    }
  };

  const stepIndicator = [
    { name: 'Delivery', icon: MapPin },
    { name: 'Payment', icon: CreditCard },
    { name: 'Review', icon: ShoppingCart },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-gray-800 dark:text-gray-100">Secure Checkout</h1>
          <p className="text-center text-muted-foreground mb-8">Complete your order in just a few simple steps.</p>
          
          {/* Stepper Visual */}
          <div className="mb-8 flex items-center justify-center space-x-2 sm:space-x-4">
            {stepIndicator.map((step, index) => (
              <React.Fragment key={step.name}>
                <div className={`flex flex-col items-center ${index + 1 <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center border-2 ${index + 1 <= currentStep ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-muted'}`}>
                    <step.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <p className="text-xs sm:text-sm mt-1.5 font-medium">{step.name}</p>
                </div>
                {index < stepIndicator.length - 1 && (
                  <div className={`flex-1 h-1 rounded-full ${index + 1 < currentStep ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {renderStepContent()}
            </form>
          </Form>
          {isLoading && currentStep === 3 && ( /* Show global loading indicator if needed, though button has one */
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
              <ThemedLoadingIndicator loadingText="Processing your order..." size={60} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;