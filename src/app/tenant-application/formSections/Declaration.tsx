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
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookCheck, Calendar, FileSignature, User } from "lucide-react";

const Declaration = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <h3 className="text-xl font-medium flex items-center gap-2">
            <BookCheck className="h-5 w-5 text-primary" />
            Final Declaration
          </h3>
          <FormDescription>
            By signing below, you confirm that all information provided in this application is true and accurate to the best of your knowledge.
          </FormDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="declaration.printedName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Printed Name
                </FormLabel>
                <FormDescription className="text-xs">
                  Your full legal name as it appears on official documents
                </FormDescription>
                <FormControl>
                  <Input {...field} placeholder="Your full legal name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="declaration.signature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileSignature className="h-4 w-4 text-primary" />
                    Signature
                  </FormLabel>
                  <FormDescription className="text-xs">
                    Type your full name as your electronic signature
                  </FormDescription>
                  <FormControl>
                    <Input {...field} placeholder="Sign your full name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="declaration.date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Date
                  </FormLabel>
                  <FormDescription className="text-xs">
                    Today's date
                  </FormDescription>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Declaration;