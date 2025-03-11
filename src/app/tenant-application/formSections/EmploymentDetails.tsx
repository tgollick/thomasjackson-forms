"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Briefcase, Clock } from "lucide-react";

const EmploymentDetails = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <h3 className="font-medium flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            Employment Information
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Employment Status Dropdown */}
          <FormField
            control={control}
            name="employmentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Status</FormLabel>
                <FormDescription className="text-xs">
                  Select your current employment situation
                </FormDescription>
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
                    <SelectItem value="selfEmployed">Self Employed</SelectItem>
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
                <FormLabel className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Weekly Work Hours
                </FormLabel>
                <FormDescription className="text-xs">
                  Average number of hours you work per week
                </FormDescription>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default EmploymentDetails;
