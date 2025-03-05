"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";

const UtilitiesArrears = () => {
  const { control } = useFormContext();

  return (
    <section className="space-y-6">      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="utilitiesArrears.councilTax"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Council Tax Arrears</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="utilitiesArrears.electric"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Electricity Bill Arrears</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="utilitiesArrears.water"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Water Bill Arrears</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="utilitiesArrears.tvLicence"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>TV Licence Arrears</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default UtilitiesArrears;