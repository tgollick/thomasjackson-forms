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

const LivingSituation = () => {
  const { control, watch, setValue } = useFormContext();
  const currentSituation = watch("currentSituation");

  const handleSituationChange = (value: string) => {
    // Update the currentSituation field
    setValue("currentSituation", value);

    // Reset landlordDetails if not renting
    if (value !== "rented") {
      setValue("landlordDetails", undefined, {
        shouldValidate: true, // Trigger validation after reset
        shouldDirty: true,
      });
    }
  };

  return (
    <section className="space-y-6">
      {/* Current Situation Select */}
      <FormField
        control={control}
        name="currentSituation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Living Situation</FormLabel>
            <Select onValueChange={handleSituationChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your current situation" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="homeowner">Homeowner</SelectItem>
                <SelectItem value="rented">Renting Accommodation</SelectItem>
                <SelectItem value="livingAtHomeOrWithFriends">
                  Living with Family/Friends
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Conditional Landlord Details */}
      {currentSituation === "rented" && (
        <div className="space-y-4 border p-4 rounded-lg">
          <h3 className="font-medium">Landlord Information</h3>

          <FormField
            control={control}
            name="landlordDetails.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landlord Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Smith" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="landlordDetails.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landlord Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="123 Rental Lane" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="landlordDetails.telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landlord Telephone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="07123456789" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </section>
  );
};

export default LivingSituation;
