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
import {
  LucideCircleX,
  LucideTrash,
  LucideUpload,
  LucideX,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type Props = {};

const FileUpload = (props: Props) => {
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
          <div className="w-full h-full aspect-square rounded-md overflow-hidden relative">
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
            <div className="w-full rounded-md h-full aspect-square bg-gray-100 flex flex-col items-center justify-center gap-2">
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
        <Button>
          Upload File <LucideUpload />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileUpload;
