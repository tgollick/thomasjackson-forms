import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import type { BuyerOfferFormValues } from "../buyerOfferSchema";

// Will contain:
// - Identification Uploads
// - Proof of Funds

type Props = {};

const IdentificationFunds = (props: Props) => {
  const form = useFormContext<BuyerOfferFormValues>();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "identificationUploads" | "fundProofUpload"
  ) => {
    const files = Array.from(e.target.files || []);
    form.setValue(fieldName, files);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Identification Documents</label>
        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="identificationUploads"
            render={({ field: { value, ...field } }) => (
              <div className="flex-1">
                <Input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  className="hidden"
                  id="idUploads"
                  {...field}
                  onChange={(e) => handleFileChange(e, "identificationUploads")}
                />
                <label htmlFor="idUploads">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <div>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload ID Documents
                    </div>
                  </Button>
                </label>
                {value?.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {value.length} file(s) selected
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="fundPurchase"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Funding Method</label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select funding method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Mortgage">Mortgage</SelectItem>
                <SelectItem value="Cash from sale">Cash from sale</SelectItem>
                <SelectItem value="Loan">Loan</SelectItem>
                <SelectItem value="Savings/ISA/Bonds">
                  Savings/ISA/Bonds
                </SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <FormField
        control={form.control}
        name="fundProof"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Proof Type</label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select proof type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bank statement">Bank statement</SelectItem>
                <SelectItem value="Agreement in principle">
                  Agreement in principle
                </SelectItem>
                <SelectItem value="Loan documents">Loan documents</SelectItem>
                <SelectItem value="Savings">Savings</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Proof of Funds</label>
        <FormField
          control={form.control}
          name="fundProofUpload"
          render={({ field: { value, ...field } }) => (
            <div className="flex-1">
              <Input
                type="file"
                multiple
                accept="image/*,.pdf"
                className="hidden"
                id="fundProof"
                {...field}
                onChange={(e) => handleFileChange(e, "fundProofUpload")}
              />
              <label htmlFor="fundProof">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <div>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Proof of Funds
                  </div>
                </Button>
              </label>
              {value?.length > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  {value.length} file(s) selected
                </p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default IdentificationFunds;
