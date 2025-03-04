import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {};

const HouseholdInformation = (props: Props) => {
  const { control } = useFormContext();

  return (
    <section className="space-y-4">
      {/* Marital Status Dropdown */}
      <FormField
        control={control}
        name="maritalStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Marital Status</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your marital status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="marriedOrPartner">
                  Married/Partner
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Household Details Textarea */}
      <FormField
        control={control}
        name="householdDetails"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Household Details</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Describe your household composition, including family members or other occupants..."
                className="min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

export default HouseholdInformation;
