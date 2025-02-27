"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { prisma } from "@/utils/prisma";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LucideTrash, LucideUpload } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {};

const FileUpload = (props: Props) => {
  const trpc = useTRPC();
  const uploadUrlMutation = useMutation(
    trpc.file.getUploadURL.mutationOptions({})
  );

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setFile(file);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const uploadFile = async () => {
    setLoading(true);
    try {
      if (file) {
        toast("Your file upload has started...");
        const uploadData = await uploadUrlMutation.mutateAsync({
          fileName: file.name,
        });

        if (!uploadData?.uploadUrl || !uploadData || !uploadData.key) {
          toast("Error fetching upload URL");
          setLoading(false);
          return new Error("Error fetching upload URL");
        }

        toast("Your file is uploading...");

        await fetch(uploadData.uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        toast("Your file was uploaded successfully!");
        setLoading(false);
      } else {
        toast("Please make sure you have uploaded a file");
        setLoading(false);
        return new Error("Please make sure you have uploaded a file");
      }
    } catch (err) {
      toast("There was an error uploading your file:" + err);
      setLoading(false);
      return console.error("There was an error uploading your file: " + err);
    }
  };
  return (
    <Card className="w-full h-full max-w-[500px]">
      <CardHeader>
        <CardTitle>File Upload</CardTitle>
        <CardDescription>
          Upload your file below and press the upload button to send it off.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {previewUrl != null ? (
          <div className="w-full h-full aspect-video rounded-md overflow-hidden relative">
            <Image
              src={previewUrl}
              height="300"
              width="300"
              alt="Preview of uploaded file"
              className="object-cover object-center w-full h-full"
            />
            <div
              onClick={() => {
                setFile(undefined);
                setPreviewUrl(undefined);
              }}
              className="hover:cursor-pointer absolute top-2 right-2 z-50 flex items-center-justify-center rounded-full bg-white p-2"
            >
              <LucideTrash color={"red"} />
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {file == undefined ? (
          <label className="hover:cursor-pointer">
            <div className="w-full rounded-md h-full aspect-video bg-gray-100 flex flex-col items-center justify-center gap-2">
              <LucideUpload color={"grey"} size={"50"} />
              <p className="text-gray-500 font-normal text-sm">Upload a file</p>
              <Input
                type="file"
                onChange={handleFileChange}
                className="bg-transparent flex-1 border-none outline-none hidden"
              />
            </div>
          </label>
        ) : (
          <div></div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => uploadFile()} className="w-full">
          {loading ? (
            <div className="loader"></div>
          ) : (
            <>
              {" "}
              Upload File <LucideUpload />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileUpload;
