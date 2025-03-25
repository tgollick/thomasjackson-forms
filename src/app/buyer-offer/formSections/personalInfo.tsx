import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import type { BuyerOfferFormValues } from "../buyerOfferSchema";

// Will contain:
// - Property Address
// - Buyer Names
// - Current Address

export default function PersonalInfo() {
  const form = useFormContext<BuyerOfferFormValues>();
  const buyerNames = form.watch("buyerNames");

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
          <div className="space-y-2">
            <label className="text-sm font-medium">Property Address</label>
            <Input {...field} placeholder="Enter the property address" />
          </div>
        )}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Buyer Names</label>
        {buyerNames.map((_, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <FormField
              control={form.control}
              name={`buyerNames.${index}`}
              render={({ field }) => (
                <Input {...field} placeholder={`Buyer ${index + 1} name`} />
              )}
            />
            {index > 0 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeBuyerName(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addBuyerName}
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Buyer
        </Button>
      </div>

      <FormField
        control={form.control}
        name="currentAddress"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Address</label>
            <Input {...field} placeholder="Enter your current address" />
          </div>
        )}
      />
    </div>
  );
}
