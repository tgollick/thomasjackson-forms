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
import { Switch } from "@/components/ui/switch";

const PreviousEmployer = () => {
  const { control, watch } = useFormContext();
  const hasPreviousEmployer = watch("previousEmployer");

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <FormField
          control={control}
          name="previousEmployer"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel>Add Previous Employer</FormLabel>
              <FormControl>
                <Switch
                  checked={!!field.value}
                  onCheckedChange={(checked) => 
                    checked ? 
                      field.onChange({
                        jobTitle: "",
                        companyName: "",
                        employerAddress: "",
                        employerPostCode: "",
                        employerTelephone: "",
                        employerEmail: "",
                        timeEmployed: "",
                        previousSalary: 0
                      }) : 
                      field.onChange(undefined)
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {hasPreviousEmployer && (
        <div className="space-y-4 border p-4 rounded-lg">
          <FormField
            control={control}
            name="previousEmployer.jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Software Engineer" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="previousEmployer.companyName"
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
            <FormField
              control={control}
              name="previousEmployer.employerAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="123 Business Park" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="previousEmployer.employerPostCode"
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
            <FormField
              control={control}
              name="previousEmployer.employerTelephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="020 7946 0000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="previousEmployer.employerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="hr@company.com" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="previousEmployer.timeEmployed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Duration</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="2 years 6 months" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="previousEmployer.previousSalary"
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
        </div>
      )}
    </section>
  );
};

export default PreviousEmployer;