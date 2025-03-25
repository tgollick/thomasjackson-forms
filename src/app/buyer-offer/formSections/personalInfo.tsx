"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Minus,
  House,
  PersonStanding,
  BookUser,
  User,
  Users,
} from "lucide-react";
import type { BuyerOfferFormValues } from "../buyerOfferSchema";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Will contain:
// - Property Address
// - Buyer Names
// - Current Address

export default function PersonalInfo() {
  const form = useFormContext<BuyerOfferFormValues>();
  const buyerNames = form.watch("buyerNames");
  const numberOfBuyers = form.watch("numberOfBuyers");

  // Update buyer names array when purchase type changes
  useEffect(() => {
    const currentNames = form.getValues("buyerNames");
    if (numberOfBuyers === 1 && currentNames.length > 1) {
      form.setValue("buyerNames", [currentNames[0] || ""]);
    } else if (numberOfBuyers === 2 && currentNames.length < 2) {
      form.setValue("buyerNames", [...currentNames, ""]);
    }
  }, [numberOfBuyers]);

  const addBuyerName = () => {
    form.setValue("buyerNames", [...buyerNames, ""]);
  };

  const removeBuyerName = (index: number) => {
    form.setValue(
      "buyerNames",
      buyerNames.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="propertyAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <House className="h-4 w-4 text-primary" />
              Property Address
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input {...field} placeholder="Enter the property address" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="numberOfBuyers"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 mb-5">
              <House className="h-4 w-4 text-primary" />
              Are you purchasing independently or with others?
            </FormLabel>
            <FormControl>
              <div className="relative">
                <RadioGroup
                  onValueChange={(value) => {
                    // Directly set the number value using Number()
                    form.setValue("numberOfBuyers", Number(value), {
                      shouldValidate: true,
                    });
                  }}
                  value={String(field.value)} // Convert back to string for display
                  defaultValue="1"
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="single" />
                    <Label htmlFor="single" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Purchasing Independently
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="joint" />
                    <Label htmlFor="joint" className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Joint Purchase
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        {numberOfBuyers === 1 ? (
          <FormField
            control={form.control}
            name="buyerNames.0"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <House className="h-4 w-4 text-primary" />
                  Buyer Name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter buyer's full name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <>
            <FormField
              control={form.control}
              name="buyerNames.0"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <House className="h-4 w-4 text-primary" />
                    First Buyer Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter first buyer's full name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buyerNames.1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <House className="h-4 w-4 text-primary" />
                    Second Buyer Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter second buyer's full name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </div>

      <FormField
        control={form.control}
        name="currentAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <House className="h-4 w-4 text-primary" />
              Current Address
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter your current address" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
