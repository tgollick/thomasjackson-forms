"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const PropertyDetails = () => {
  const { control } = useFormContext(); // Get form context from parent

  return (
    <section className="space-y-4">
      <FormField
        control={control}
        name="propertyAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Address</FormLabel>
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
            <FormLabel>Monthly Rent (£)</FormLabel>
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
            <FormLabel>Move-in Date</FormLabel>
            <FormControl>
              <Input {...field} type="date" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

export default PropertyDetails;
