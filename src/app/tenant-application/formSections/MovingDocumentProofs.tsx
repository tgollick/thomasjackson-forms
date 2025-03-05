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
import { useFormContext } from "react-hook-form";

const MovingDocumentProofs = () => {
  const { control } = useFormContext();

  return (
    <section className="space-y-6">
      <FormField
        control={control}
        name="reasonForMoving"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Reason for Moving <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Textarea {...field} className="h-full max-h-[300px]" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="bankStatement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              6 Months Bank Statements{" "}
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Document 2 (Optional) */}
      <FormField
        control={control}
        name="id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              ID (Passport or Drivers License){" "}
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Document 3 (Optional) */}
      <FormField
        control={control}
        name="proofOfAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Proof of Address <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

export default MovingDocumentProofs;
