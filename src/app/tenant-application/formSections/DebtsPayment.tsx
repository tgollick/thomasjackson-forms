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

const DebtsPayment = () => {
  const { control } = useFormContext();

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Debts & Payment Plans</h2>
      
      <FormField
        control={control}
        name="debtsPayment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly Debt Payments (£)</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder="Enter total monthly debt payments (optional)"
                onChange={(e) => 
                  field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

export default DebtsPayment;
