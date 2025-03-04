"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

const PetsSmoking = () => {
  const { control } = useFormContext();

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">Pets & Smoking</h2>

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
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Pets Information */}
      <FormField
        control={control}
        name="pets"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Do you have any pets? (Optional)</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="List any pets you have including type, breed, and age..."
                className="min-h-[100px]"
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
              <FormLabel>
                I agree to allow property inspections when required
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

export default PetsSmoking;
