import type { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface FinancialInfoProps {
  form: UseFormReturn<any>;
}

export default function FinancialInfo({ form }: FinancialInfoProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="hasCCJ"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Do you have any county court judgements, pending or current
                against you?
              </FormLabel>
              <FormDescription>
                Please check this box if you have any CCJs.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="ccjDetails"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CCJ Details</FormLabel>
            <FormControl>
              <Input
                placeholder="If yes, provide details (date, amount, duration)"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="hasBankruptcy"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Have you ever been made bankrupt or been subject to any
                insolvency arrangements or agreements?
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bankruptcyDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bankruptcy Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="monthlyDebtPayments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly Debt Payments (£)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter total monthly payments towards debts"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
