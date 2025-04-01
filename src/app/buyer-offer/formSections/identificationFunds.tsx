import React from "react";
import { useFormContext } from "react-hook-form";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileIcon, Upload, UploadIcon, XIcon } from "lucide-react";
import type { BuyerOfferFormValues } from "../buyerOfferSchema";

// Will contain:
// - Identification Uploads
// - Proof of Funds

const FileUpload = ({
  field,
  fieldName,
  accept = ".pdf,.jpg,.jpeg,.png",
}: {
  field: any;
  fieldName: string;
  accept?: string;
}) => {
  const { getValues } = useFormContext();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const getFile = () => {
    const file = getValues(fieldName) as File;
    return file;
  };

  const file = getFile();

  const isImage = file && file.type.startsWith("image/");

  const handleDelete = () => {
    field.onChange(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-s-muted rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors"
        >
          <UploadIcon className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-400">PDF, JPG, JPEG, PNG</p>
          <Input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={(e) => field.onChange(e.target.files?.[0])}
            className="hidden"
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-muted">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <FileIcon className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium truncate max-w-[200px]">
                {file.name}
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Change
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isImage && (
            <div className="mt-2 relative w-full h-32 bg-muted rounded overflow-hidden">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          <Input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={(e) => field.onChange(e.target.files?.[0])}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

type Props = {};

const IdentificationFunds = (props: Props) => {
  const form = useFormContext<BuyerOfferFormValues>();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <FormLabel>
          Please provide two forms of identification (Passport, Driving License,
          Utility Bill)
        </FormLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <FormField
            control={form.control}
            name="identificationUploads.0"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>Identification Document 1</FormLabel>
                <FormControl>
                  <FileUpload
                    field={field}
                    fieldName="identificationUploads.0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="identificationUploads.1"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>Identification Document 2</FormLabel>
                <FormControl>
                  <FileUpload
                    field={field}
                    fieldName="identificationUploads.1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="fundPurchase"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Funding Method</FormLabel>
            <FormControl>
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
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fundProof"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Proof Type</FormLabel>
            <FormControl>
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
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormField
          control={form.control}
          name="fundProofUpload"
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <FormLabel>Proof of Funds</FormLabel>
              <FormControl>
                <FileUpload field={field} fieldName="fundProofUpload" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default IdentificationFunds;
