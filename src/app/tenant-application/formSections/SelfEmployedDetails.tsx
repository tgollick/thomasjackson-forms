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

const SelfEmployedDetails = () => {
  const { control } = useFormContext();

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">Self-Employment Details</h2>

      <div className="space-y-4">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="selfEmployedDetails.jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title/Role</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Freelance Developer" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="selfEmployedDetails.companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Smith Consulting" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="selfEmployedDetails.companyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="123 Business Park" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Accountant Section */}
        <div className="border p-4 rounded-lg space-y-4">
          <h3 className="font-medium">Accountant Information</h3>
          
          <FormField
            control={control}
            name="selfEmployedDetails.accountant.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accountant Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Smith & Co" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="selfEmployedDetails.accountant.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accountant Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="456 Finance Street" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="selfEmployedDetails.accountant.phone"
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
          </div>

          <FormField
            control={control}
            name="selfEmployedDetails.accountant.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="accounting@firm.com" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Business Reference Section */}
        <div className="border p-4 rounded-lg space-y-4">
          <h3 className="font-medium">Business Reference</h3>
          
          <FormField
            control={control}
            name="selfEmployedDetails.businessReference.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Client or Partner Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="selfEmployedDetails.businessReference.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="789 Commerce Road" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="selfEmployedDetails.businessReference.phone"
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
          </div>

          <FormField
            control={control}
            name="selfEmployedDetails.businessReference.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="contact@reference.com" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default SelfEmployedDetails;