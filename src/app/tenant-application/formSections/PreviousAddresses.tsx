"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";

const PreviousAddresses = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "previousAddresses",
  });

  return (
    <section className="space-y-6">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Address #{index + 1}</h3>
              {index > 0 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              )}
            </div>

            {/* Address Field */}
            <FormField
              control={control}
              name={`previousAddresses.${index}.address`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="123 Main Street" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PostCode Field */}
            <FormField
              control={control}
              name={`previousAddresses.${index}.postCode`} // Note the capital C
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="SW1A 1AA" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time at Address Field */}
            <FormField
              control={control}
              name={`previousAddresses.${index}.timeAtAddress`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time at Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., 2 years 6 months" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            address: "",
            postCode: "", // Capital C to match schema
            timeAtAddress: "",
          })
        }
      >
        Add Previous Address
      </Button>
    </section>
  );
};

export default PreviousAddresses;
