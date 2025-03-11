"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Calendar, Mail, MapPin, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const PersonalDetails = () => {
  const { control } = useFormContext(); // Get form context from parent

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Full Name
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    {...field} 
                    placeholder="John Smith" 
                    className="pl-3 h-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Date of Birth
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    {...field}
                    type="date"
                    placeholder="DD/MM/YYYY"
                    className="pl-3 h-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <h3 className="text-sm font-medium">Current Address</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="currentAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Street Address
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="123 Wilson Lane"
                    className="pl-3 h-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={control}
              name="postCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="CT4 2QN"
                      className="pl-3 h-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="timeAtAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time at Address (Years)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="1.5"
                      className="pl-3 h-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    E.g. one and a half years would be 1.5
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name="telephoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Telephone Number
              </FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="07818302999"
                  className="pl-3 h-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email Address
              </FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="email"
                  placeholder="john.smith@example.com"
                  className="pl-3 h-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PersonalDetails;
