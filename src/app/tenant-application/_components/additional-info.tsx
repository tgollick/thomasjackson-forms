import type { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface AdditionalInfoProps {
  form: UseFormReturn<any>;
}

export default function AdditionalInfo({ form }: AdditionalInfoProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="pets"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pets</FormLabel>
            <FormControl>
              <Textarea placeholder="List any pets you have" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="isSmoker"
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
                Are you, or anybody who will be living with you, a smoker?
              </FormLabel>
              <FormDescription>
                Note: All rental properties are strictly no smoking.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="allowHomeInspection"
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
                Would you allow Thomas Jackson to carry out a current home
                inspection if requested by the landlord?
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="reasonForMoving"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reason for Moving</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Explain your reason for moving"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="canProvideDocuments"
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
                Can you provide 6 months bank statements, proof of address, and
                valid ID?
              </FormLabel>
              <FormDescription>
                This includes recent utility bills, passport or driving license,
                and birth certificate.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
