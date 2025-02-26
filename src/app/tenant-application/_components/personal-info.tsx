import type { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PersonalInfoProps {
  form: UseFormReturn<any>;
}

export default function PersonalInfo({ form }: PersonalInfoProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="currentAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Address</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter your current address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="postCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Post Code</FormLabel>
            <FormControl>
              <Input placeholder="Enter your postcode" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="timeAtAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Time at Address</FormLabel>
            <FormControl>
              <Input
                placeholder="How long have you lived at your current address?"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="Enter your contact number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email address"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <Input
                type="date"
                {...field}
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().substring(0, 10)
                    : ""
                }
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? new Date(e.target.value) : null
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="currentLivingSituation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Living Situation</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your current living situation" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="homeowner">A homeowner</SelectItem>
                <SelectItem value="renting">In rented accommodation</SelectItem>
                <SelectItem value="living_with_others">
                  Living at home or with friends
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
