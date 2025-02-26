import type { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PropertyDetailsProps {
  form: UseFormReturn<any>;
}

export default function PropertyDetails({ form }: PropertyDetailsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="propertyAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Address</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter the address of the property you are applying to rent"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Please provide the full address of the property.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="rentalAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rental Amount</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter the proposed rental amount"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="moveInDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Move-in Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date < new Date() || date > new Date("2100-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>Select your desired move-in date.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
