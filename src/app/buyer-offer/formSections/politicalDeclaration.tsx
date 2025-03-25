import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import type { BuyerOfferFormValues } from "../buyerOfferSchema";

// Will contain:
// - Politically Exposed
// - Politically Exposed Details
// - Declaration Names
// - Declaration Signatures
// - Declaration Date

export default function PoliticalDeclaration() {
  const form = useFormContext<BuyerOfferFormValues>();
  const declarationNames = form.watch("declarationNames");
  const declarationSignature = form.watch("declarationSignature");
  const politicallyExposed = form.watch("politicallyExposed");

  const addDeclarationName = () => {
    form.setValue("declarationNames", [...declarationNames, ""]);
    form.setValue("declarationSignature", [...declarationSignature, ""]);
  };

  const removeDeclarationName = (index: number) => {
    form.setValue(
      "declarationNames",
      declarationNames.filter((_, i) => i !== index)
    );
    form.setValue(
      "declarationSignature",
      declarationSignature.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="politicallyExposed"
        render={({ field }) => (
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              Politically Exposed Person
            </label>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </div>
        )}
      />

      {politicallyExposed && (
        <FormField
          control={form.control}
          name="politicallyExposedDetails"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Political Exposure Details
              </label>
              <Textarea
                {...field}
                placeholder="Please provide details about your political exposure"
              />
            </div>
          )}
        />
      )}

      <div className="space-y-4">
        {declarationNames.map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`declarationNames.${index}`}
                render={({ field }) => (
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium">
                      Declaration Name
                    </label>
                    <Input {...field} placeholder="Enter full name" />
                  </div>
                )}
              />
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="mt-8"
                  onClick={() => removeDeclarationName(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
            <FormField
              control={form.control}
              name={`declarationSignature.${index}`}
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Signature</label>
                  <Input {...field} placeholder="Enter signature" />
                </div>
              )}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addDeclarationName}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Declaration
        </Button>
      </div>

      <FormField
        control={form.control}
        name="declarationDate"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Declaration Date</label>
            <Input
              type="date"
              {...field}
              value={
                field.value instanceof Date
                  ? field.value.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => field.onChange(new Date(e.target.value))}
            />
          </div>
        )}
      />
    </div>
  );
}
