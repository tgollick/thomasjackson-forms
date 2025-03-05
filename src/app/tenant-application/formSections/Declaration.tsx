"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const Declaration = () => {
  const { control } = useFormContext();

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">Final Declaration</h2>
      
      <div className="space-y-4">
        <FormField
          control={control}
          name="declaration.printedName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Printed Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Your full legal name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="declaration.signature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Signature</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Sign your full name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="declaration.date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default Declaration;