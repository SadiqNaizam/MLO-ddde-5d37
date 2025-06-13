import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, MapPin, CreditCard, History, Bell, ShoppingBag } from 'lucide-react';

// Define Zod schemas for forms
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).optional().or(z.literal('')),
});
type ProfileFormValues = z.infer<typeof profileFormSchema>;

const addressFormSchema = z.object({
    street: z.string().min(5, "Street is too short"),
    city: z.string().min(2, "City is too short"),
    state: z.string().min(2, "State is too short"),
    zip: z.string().min(5, "Zip code is too short"),
    isDefault: z.boolean().optional(),
});
type AddressFormValues = z.infer<typeof addressFormSchema>;


// Sample data
const sampleOrders = [
  { id: 'ORD001', date: '2023-10-26', items: 3, total: '$45.99', status: 'Delivered', restaurant: 'Pizza Place' },
  { id: 'ORD002', date: '2023-11-05', items: 2, total: '$22.50', status: 'Processing', restaurant: 'Burger Joint' },
  { id: 'ORD003', date: '2023-11-12', items: 5, total: '$78.00', status: 'Cancelled', restaurant: 'Sushi Central' },
];

const sampleAddresses = [
    { id: 'addr1', street: '123 Main St', city: 'Anytown', state: 'CA', zip: '90210', isDefault: true },
    { id: 'addr2', street: '456 Oak Ave', city: 'Otherville', state: 'NY', zip: '10001', isDefault: false },
];

const samplePaymentMethods = [
    { id: 'pm1', type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 'pm2', type: 'MasterCard', last4: '5555', expiry: '06/26', isDefault: false },
];

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    },
  });

  const onProfileSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    console.log("Profile data submitted:", data);
    // Add API call logic here
    alert("Profile updated successfully!");
  };

  // Placeholder for address form submission
  const onAddressSubmit = (data: AddressFormValues) => {
    console.log("New address data:", data);
    alert("Address added/updated (simulated).");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="account"><User className="mr-2 h-4 w-4 inline-block" />Account</TabsTrigger>
            <TabsTrigger value="addresses"><MapPin className="mr-2 h-4 w-4 inline-block" />Addresses</TabsTrigger>
            <TabsTrigger value="payment"><CreditCard className="mr-2 h-4 w-4 inline-block" />Payment</TabsTrigger>
            <TabsTrigger value="orders"><ShoppingBag className="mr-2 h-4 w-4 inline-block" />Orders</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4 inline-block" />Notifications</TabsTrigger>
          </TabsList>

          {/* Account Details Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your personal details.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...profileForm.register("name")} className="mt-1"/>
                    {profileForm.formState.errors.name && <p className="text-red-500 text-sm mt-1">{profileForm.formState.errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" {...profileForm.register("email")} className="mt-1"/>
                    {profileForm.formState.errors.email && <p className="text-red-500 text-sm mt-1">{profileForm.formState.errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" {...profileForm.register("phone")} className="mt-1"/>
                     {profileForm.formState.errors.phone && <p className="text-red-500 text-sm mt-1">{profileForm.formState.errors.phone.message}</p>}
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Manage your delivery addresses.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sampleAddresses.map(addr => (
                    <Card key={addr.id} className="p-4">
                        <p className="font-semibold">{addr.street}, {addr.city}, {addr.state} {addr.zip}</p>
                        {addr.isDefault && <span className="text-xs text-green-600 font-medium">(Default)</span>}
                        <div className="mt-2 space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                        </div>
                    </Card>
                ))}
                 <Button className="mt-4">Add New Address</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your saved payment options.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 {samplePaymentMethods.map(pm => (
                    <Card key={pm.id} className="p-4">
                        <p className="font-semibold">{pm.type} ending in {pm.last4}</p>
                        <p className="text-sm text-gray-500">Expires: {pm.expiry}</p>
                        {pm.isDefault && <span className="text-xs text-green-600 font-medium">(Default)</span>}
                         <div className="mt-2 space-x-2">
                            <Button variant="outline" size="sm">Set as Default</Button>
                            <Button variant="destructive" size="sm">Remove</Button>
                        </div>
                    </Card>
                 ))}
                <Button className="mt-4">Add New Payment Method</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of your recent orders.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Restaurant</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.restaurant}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>
                           <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                           }`}>
                            {order.status}
                           </span>
                        </TableCell>
                        <TableCell>
                          <Link to={`/order-tracking?orderId=${order.id}`}>
                            <Button variant="link" size="sm">View Details</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                 {sampleOrders.length === 0 && <p className="text-center text-gray-500 py-4">You have no past orders.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Preferences Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how we contact you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailPromotions" className="flex-grow">Email me about promotions and news</Label>
                  <Switch id="emailPromotions" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="smsOrderUpdates" className="flex-grow">Send SMS for order updates</Label>
                  <Switch id="smsOrderUpdates" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="pushAppUpdates" className="flex-grow">Push notifications for app updates</Label>
                  <Switch id="pushAppUpdates" defaultChecked />
                </div>
                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;