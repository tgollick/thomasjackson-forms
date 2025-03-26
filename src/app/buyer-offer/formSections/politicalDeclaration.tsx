import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import type { BuyerOfferFormValues } from "../buyerOfferSchema";

// Will contain:
// - Politically Exposed
// - Politically Exposed Details
// - Declaration Names
// - Declaration Signatures
// - Declaration Date

export default function PoliticalDeclaration() {
  const form = useFormContext<BuyerOfferFormValues>();
  const numberOfBuyers = form.watch("numberOfBuyers");
  const politicallyExposed = form.watch("politicallyExposed");

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="politicallyExposed"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Politically Exposed Person</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {politicallyExposed && (
        <FormField
          control={form.control}
          name="politicallyExposedDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Political Exposure Details</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Please provide details about your political exposure"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="space-y-4">
        {Array.from({ length: numberOfBuyers }).map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`declarationNames.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Declaration Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter full name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name={`declarationSignature.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Signature</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter signature" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>

      <FormField
        control={form.control}
        name="declarationDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Declaration Date</FormLabel>
            <FormControl>
              <Input
                type="date"
                {...field}
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => field.onChange(new Date(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
