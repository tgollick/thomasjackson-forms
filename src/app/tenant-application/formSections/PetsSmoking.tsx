"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Cat, Shell, Shield } from "lucide-react";

const PetsSmoking = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
                <h3 className="font-medium flex items-center gap-2">
            <Shell className="h-4 w-4 text-primary" />
            Smoking Information
          </h3>
          {/* Smoker Checkbox */}
          <FormField
            control={control}
            name="smoker"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(e) => field.onChange(Boolean(e))}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Are you a smoker?</FormLabel>
                  <FormDescription className="text-xs">
                    Please indicate if any household members smoke
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pets Information */}
          <h3 className="font-medium flex items-center gap-2">
            <Cat className="h-4 w-4 text-primary" />
            Pet Information
          </h3>
          <FormField
            control={control}
            name="pets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have any pets?</FormLabel>
                <FormDescription className="text-xs">
                  List all pets including type, breed, and age
                </FormDescription>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Example: 1 cat (British Shorthair, 3 years old), 1 small dog (Jack Russell, 2 years old)..."
                    className="min-h-[100px] resize-none"
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Mandatory Inspection Agreement */}
          <FormField
            control={control}
            name="allowInspection"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(e) => field.onChange(Boolean(e))}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    I agree to allow property inspections when required
                  </FormLabel>
                  <FormDescription className="text-xs">
                    This is a mandatory requirement for all tenancy agreements
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

    </div>
  );
};

export default PetsSmoking;
