"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

const EmploymentDetails = () => {
  const { control } = useFormContext();

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Employment Details</h2>

      {/* Employment Status Dropdown */}
      <FormField
        control={control}
        name="employmentStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employment Status</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="fullTime">Full-Time Employment</SelectItem>
                <SelectItem value="partTime">Part-Time Employment</SelectItem>
                <SelectItem value="seekingEmployment">
                  Seeking Employment
                </SelectItem>
                <SelectItem value="unemployed">Currently Unemployed</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Work Hours Input */}
      <FormField
        control={control}
        name="workHours"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weekly Work Hours</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder="35"
                min="0"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

export default EmploymentDetails;
