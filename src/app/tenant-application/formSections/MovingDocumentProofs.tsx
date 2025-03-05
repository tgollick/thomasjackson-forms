"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import React, { useState } from "react";
import { FileIcon, UploadIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const FileUpload = ({ 
  field, 
  fieldName, 
  accept = ".pdf,.jpg,.jpeg,.png" 
}: { 
  field: any; 
  fieldName: string; 
  accept?: string;
}) => {
  const { getValues } = useFormContext();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const getFile = () => {
    const file = getValues(fieldName) as File;
    return file && file.name !== "placeholder" ? file : null;
  };

  const file = getFile();
  const isImage = file && file.type.startsWith("image/");

  const handleDelete = () => {
    // Create a new dummy file with name "placeholder"
    const dummyFile = new File([], "placeholder", {
      type: "application/octet-stream",
    });
    field.onChange(dummyFile);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <UploadIcon className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-1">Click to upload or drag and drop</p>
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
        <div className="border rounded-lg p-4 bg-gray-50">
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
            <div className="mt-2 relative w-full h-32 bg-gray-100 rounded overflow-hidden">
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

const MovingDocumentProofs = () => {
  const { control } = useFormContext();

  return (
    <section className="space-y-6">
      <FormField
        control={control}
        name="reasonForMoving"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Reason for Moving <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Textarea {...field} className="h-full max-h-[300px]" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="bankStatement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              6 Months Bank Statements{" "}
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <FileUpload field={field} fieldName="bankStatement" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              ID (Passport or Drivers License){" "}
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <FileUpload field={field} fieldName="id" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="proofOfAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Proof of Address <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <FileUpload field={field} fieldName="proofOfAddress" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

export default MovingDocumentProofs;
