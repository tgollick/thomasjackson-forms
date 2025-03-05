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

const EmployedDetails = () => {
  const { control, watch } = useFormContext();
  const employmentStatus = watch("employmentStatus");

  if (!["fullTime", "partTime"].includes(employmentStatus)) return null;

  return (
    <section className="space-y-6">
      <h3 className="text-lg font-semibold">Employment Details</h3>
      
      <div className="space-y-4">
        {/* Job Title */}
        <FormField
          control={control}
          name="employedDetails.jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Senior Developer" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Name */}
        <FormField
          control={control}
          name="employedDetails.companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Tech Corp Ltd" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Employer Address */}
          <FormField
            control={control}
            name="employedDetails.employerAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employer Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="123 Business Park" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Postcode */}
          <FormField
            control={control}
            name="employedDetails.employerPostCode"
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Telephone */}
          <FormField
            control={control}
            name="employedDetails.employerTelephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employer Telephone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="020 7946 0000" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={control}
            name="employedDetails.employerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employer Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="hr@company.com" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Time Employed */}
          <FormField
            control={control}
            name="employedDetails.timeEmployed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Employed</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="2 years 6 months" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Current Salary */}
          <FormField
            control={control}
            name="employedDetails.currentSalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual Salary (£)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="45000"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* National Insurance Number */}
        <FormField
          control={control}
          name="employedDetails.nationalInsuranceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>National Insurance Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="QQ 12 34 56 C" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
};

export default EmployedDetails;