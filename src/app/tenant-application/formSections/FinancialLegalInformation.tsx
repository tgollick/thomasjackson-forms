"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";

const FinancialLegalInformation = () => {
  const { control, watch } = useFormContext();
  
  // Watch all boolean values
  const hasCCJ = watch("countyCourtJudgements");
  const isBankrupt = watch("bankruptOrInsolvent");
  const wasEvicted = watch("evicted");
  const hasLatePayments = watch("lateRentalPayments");

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">Financial & Legal History</h2>

      <div className="space-y-4">
        {/* County Court Judgements */}
        <div className="border p-4 rounded-lg space-y-4">
          <FormField
            control={control}
            name="countyCourtJudgements"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Have you ever had any County Court Judgements (CCJs)?
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          {hasCCJ && (
            <FormField
              control={control}
              name="countyCourtDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CCJ Details</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Provide details of CCJs including dates and amounts..."
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Bankruptcy/Insolvency */}
        <div className="border p-4 rounded-lg space-y-4">
          <FormField
            control={control}
            name="bankruptOrInsolvent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Have you ever been declared bankrupt or insolvent?
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          {isBankrupt && (
            <FormField
              control={control}
              name="bankruptcyDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Bankruptcy/Insolvency</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Eviction History */}
        <div className="border p-4 rounded-lg space-y-4">
          <FormField
            control={control}
            name="evicted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Have you ever been evicted from a property?
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Late Payments */}
        <div className="border p-4 rounded-lg space-y-4">
          <FormField
            control={control}
            name="lateRentalPayments"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Have you ever had late rental payments?
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          {hasLatePayments && (
            <FormField
              control={control}
              name="latePaymentDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Late Payment Details</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Explain circumstances of late payments..."
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default FinancialLegalInformation;