"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const PersonalDetails = () => {
  const { control } = useFormContext(); // Get form context from parent

  return (
    <section className="space-y-4">
      <FormField
        control={control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fullname</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Benson Hedge" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="currentAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Address</FormLabel>
            <FormControl>
              <Input {...field} placeholder="123 Wilson Lane" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="postCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Postcode</FormLabel>
            <FormControl>
              <Input {...field} placeholder="CT4 2QN" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="timeAtAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Time at Address (Years)</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="E.g. one and a half years would = 1.5"
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="telephoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telephone Number</FormLabel>
            <FormControl>
              <Input {...field} placeholder="07818302999" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="emailAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input {...field} placeholder="CT4 2QN" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <Input {...field} type="date" placeholder="CT4 2QN" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

export default PersonalDetails;
