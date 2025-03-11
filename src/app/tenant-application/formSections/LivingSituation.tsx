"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { Building, Home, MapPin, Phone, User, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const LivingSituation = () => {
  const { control, watch, setValue } = useFormContext();
  const currentSituation = watch("currentSituation");

  const handleSituationChange = (value: string) => {
    // Update the currentSituation field
    setValue("currentSituation", value);

    // Reset landlordDetails if not renting
    if (value !== "rented") {
      setValue("landlordDetails", undefined, {
        shouldValidate: true, // Trigger validation after reset
        shouldDirty: true,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Situation Selection Card */}
          <FormField
            control={control}
            name="currentSituation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" />
                  Current Living Situation
                </FormLabel>
                <FormDescription className="text-xs text-muted-foreground mt-1">
                  Select the option that best describes your current housing arrangement
                </FormDescription>
                <div className="mt-3">
                  <Select onValueChange={handleSituationChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full border border-muted-border focus:border-primary focus:ring-primary rounded-md h-10">
                        <SelectValue placeholder="Select your current situation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background border border-muted-border shadow-md rounded-md">
                      <SelectItem value="homeowner" className="flex items-center py-2.5">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 text-primary mr-2" />
                          Homeowner
                        </div>
                      </SelectItem>
                      <SelectItem value="rented" className="flex items-center py-2.5">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 text-primary mr-2" />
                          Renting Accommodation
                        </div>
                      </SelectItem>
                      <SelectItem value="livingAtHomeOrWithFriends" className="flex items-center py-2.5">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-primary mr-2" />
                          Living with Family/Friends
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
 

      {/* Conditional Landlord Details */}
      {currentSituation === "rented" && (
        <Card className="animate-in fade-in slide-in-from-top-5 duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center mb-1">
              <User className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-medium">Current Landlord Details</h3>
            </div>
            <FormDescription className="text-xs">
              Please provide your current landlord's information for reference purposes
            </FormDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField
                control={control}
                name="landlordDetails.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Landlord Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="John Smith" 
                        className="pl-3 h-10 border border-muted-border focus:border-primary focus:ring-primary rounded-md shadow-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="landlordDetails.telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Landlord Telephone
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="07700 900123" 
                        className="pl-3 h-10 border border-muted-border focus:border-primary focus:ring-primary rounded-md shadow-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="landlordDetails.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Landlord Address
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="123 Rental Lane" 
                      className="pl-3 h-10 border border-muted-border focus:border-primary focus:ring-primary rounded-md shadow-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="landlordDetails.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landlord Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email"
                      placeholder="landlord@example.com" 
                      className="pl-3 h-10 border border-muted-border focus:border-primary focus:ring-primary rounded-md shadow-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LivingSituation;
