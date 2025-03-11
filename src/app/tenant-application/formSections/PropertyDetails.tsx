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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building, Calendar, House, PoundSterling } from "lucide-react";

const PropertyDetails = () => {
  const { control } = useFormContext(); // Get form context from parent

  return (
    <div className="space-y-6">
        <FormField
          control={control}
          name="propertyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <House className="h-4 w-4 text-primary" />
                Property Address
              </FormLabel>
              <FormDescription className="text-xs">
                Enter the full address of the property you're applying for
              </FormDescription>
              <FormControl>
                <Input {...field} placeholder="123 Main St" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="rentalAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <PoundSterling className="h-4 w-4 text-primary" />
                Monthly Rent (£)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="2000"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Convert to number or undefined if empty
                    const numValue = value === "" ? undefined : Number(value);
                    field.onChange(numValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="moveInDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Move-in Date
              </FormLabel>
              <FormDescription className="text-xs">
                When would you like to move into the property?
              </FormDescription>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
</div>
  );
};

export default PropertyDetails;
