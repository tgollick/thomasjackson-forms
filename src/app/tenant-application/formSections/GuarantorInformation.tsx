"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

const GuarantorInformation = () => {
  const { control, watch, setValue } = useFormContext();
  const hasGuarantor = watch("guarantor.canProvide");
  const timeAtAddress = watch("guarantor.timeAtAddress");

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">Guarantor Information</h2>

      <div className="space-y-4">
        <FormField
          control={control}
          name="guarantor.canProvide"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      setValue("guarantor", undefined);
                    } else {
                      setValue("guarantor", {
                        canProvide: true,
                        name: "",
                        address: "",
                        postCode: "",
                        telephone: "",
                        email: "",
                        timeAtAddress: "",
                        newAddressDetails: undefined,
                        signature: "",
                        date: ""
                      });
                    }
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Can you provide a guarantor?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {hasGuarantor && (
          <div className="border p-4 rounded-lg space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="guarantor.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guarantor Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Smith" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="guarantor.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="john@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="guarantor.telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telephone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="07123456789" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="guarantor.timeAtAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time at Current Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 2 years 6 months" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="guarantor.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="123 Main Street" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="guarantor.postCode"
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

            {/* Previous Address Section */}
            {(parseInt(timeAtAddress) < 3 || timeAtAddress?.includes("less than 3")) && (
              <div className="border p-4 rounded-lg space-y-4">
                <h3 className="font-medium">Previous Address Details</h3>
                
                <FormField
                  control={control}
                  name="guarantor.newAddressDetails.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="456 Old Street" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="guarantor.newAddressDetails.postCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Postcode</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="EC1A 1BB" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="guarantor.newAddressDetails.telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Telephone</FormLabel>
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
                  name="guarantor.newAddressDetails.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="previous@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Signature Section */}
            <div className="border-t pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="guarantor.signature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guarantor Signature</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Full name as signature" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="guarantor.date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GuarantorInformation;