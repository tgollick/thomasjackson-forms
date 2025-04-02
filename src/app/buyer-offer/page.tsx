"use client";

import React, { useEffect, useState } from "react";
import DepositMortgage from "./formSections/depositMortgage";
import IdentificationFunds from "./formSections/identificationFunds";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileQuestion,
  FileText,
  User,
} from "lucide-react";

import PersonalInfo from "./formSections/personalInfo";
import PoliticalDeclaration from "./formSections/politicalDeclaration";

import {
  BuyerOfferFormValues,
  buyerOfferSchema,
  defaultValues,
  depositMortgageSchema,
  identificationFundsSchema,
  personalInfoSchema,
  politicalDeclarationSchema,
} from "./buyerOfferSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import tjLogo from "../../../public/tj-logo.svg";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingOverlay } from "@/components/loadingOverlay";

type Props = {};

const formSections = [
  {
    title: "Personal Information",
    description: "Enter your personal and contact information",
    component: <PersonalInfo />,
    schema: personalInfoSchema,
    icon: <User className="h-5 w-5" />,
  },
  {
    title: "Identification & Funds",
    description: "Upload identification and proof of funds",
    component: <IdentificationFunds />,
    schema: identificationFundsSchema,
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Deposit & Mortgage",
    description: "Enter deposit and mortgage details",
    component: <DepositMortgage />,
    schema: depositMortgageSchema,
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Political Declaration",
    description: "Declare politically exposed status",
    component: <PoliticalDeclaration />,
    schema: politicalDeclarationSchema,
    icon: <FileQuestion className="h-5 w-5" />,
  },
];

const page = (props: Props) => {
  const [section, setSection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const trpc = useTRPC();
  const router = useRouter();
  const [status, setStatus] = useState<"success" | "error" | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const buyerOfferMutation = useMutation(
    trpc.form.buyerOfferSubmission.mutationOptions()
  );

  const uploadMutation = useMutation(trpc.file.getUploadURL.mutationOptions());

  const form = useForm<BuyerOfferFormValues>({
    resolver: zodResolver(buyerOfferSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  // Update progress percentage based on current section
  useEffect(() => {
    setFormProgress(Math.round((section / (formSections.length - 1)) * 100));
  }, [section]);

  const handleNextSection = async (sectionSchema: z.ZodType) => {
    // Extract the underlying object schema if it's a ZodEffects or other wrapper
    const effectiveSchema =
      sectionSchema instanceof z.ZodEffects
        ? sectionSchema.innerType()
        : sectionSchema;

    // Safely get keys, handling different schema types
    const sectionKeys =
      effectiveSchema instanceof z.ZodObject
        ? (Object.keys(effectiveSchema.shape) as (keyof BuyerOfferFormValues)[])
        : [];

    const isValid = await form.trigger(sectionKeys);

    if (isValid) {
      setSection((prevSection) => prevSection + 1);
    }
  };

  const handlePreviousSection = () => {
    setSection((prev) => prev - 1);
  };

  const getSchemaKeys = (schema: z.ZodType): (keyof BuyerOfferFormValues)[] => {
    if (schema instanceof z.ZodObject) {
      return Object.keys(schema.shape) as (keyof BuyerOfferFormValues)[];
    }

    if (schema instanceof z.ZodEffects) {
      const innerSchema = schema.innerType();
      if (innerSchema instanceof z.ZodObject) {
        return Object.keys(innerSchema.shape) as (keyof BuyerOfferFormValues)[];
      }
    }

    return [];
  };

  const handleFileUpload = async () => {
    const fundProof = form.getValues("fundProofUpload");
    const indentification = form.getValues("identificationUploads");

    for (const file of [fundProof, ...indentification]) {
      if (!file || file.name === "") {
        return false;
      }
    }

    try {
      const fundResponse = await uploadMutation.mutateAsync({
        fileName: fundProof.name,
      });

      const identificationResponseArray = [];

      for (const file of indentification) {
        const response = await uploadMutation.mutateAsync({
          fileName: file.name,
        });
        identificationResponseArray.push(response);
      }

      await fetch(fundResponse.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": fundProof.type,
        },
        body: fundProof,
      });

      for (let i = 0; i < identificationResponseArray.length; i++) {
        const fileResponse = identificationResponseArray[i];
        const file = indentification[i];

        await fetch(fileResponse.uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });
      }

      return {
        success: true,
        fundProofKey: fundResponse.key,
        identificationKeys: identificationResponseArray.map((r) => r.key),
      };
    } catch (e) {
      toast.error("Failed to upload files");
      return false;
    }
  };

  const onSubmit = async (values: BuyerOfferFormValues) => {
    setLoading(true);

    const { identificationUploads, fundProofUpload, ...cleanInputs } = values;

    const fileUploadResult = await handleFileUpload();

    if (!fileUploadResult) {
      toast.error("Failed to upload files");
      setLoading(false);
      return;
    }

    const payload = {
      ...cleanInputs,
      identificationKeys: fileUploadResult.identificationKeys,
      fundProofKey: fileUploadResult.fundProofKey,
    };

    console.log("Mutation payload:", JSON.stringify(payload));

    try {
      const response = await buyerOfferMutation.mutateAsync(payload);

      if (response.success) {
        setStatus("success");
        setErrorMessage(String(response.message));
      } else {
        setStatus("error");
        setErrorMessage(
          String(response.message) ||
            "There was an error submitting your application."
        );
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to submit buyer offer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-3xl mx-auto">
        <Image
          src={tjLogo}
          alt="ThomasJackson Logo"
          width="62"
          height="62"
          className="mx-auto mb-8"
        />

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
            Buyer Offer Form
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete all sections to submit your property offer. Your
            information will be reviewed by our sales team.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="text-xs font-semibold text-primary uppercase">
                Progress
              </div>
              <div className="text-xs font-semibold text-primary">
                {formProgress}%
              </div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${formProgress}%` }}
                transition={{ duration: 0.5 }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-primary-foreground justify-center bg-primary"
              />
            </div>
          </div>
        </div>

        {/* Step indicators */}
        <div className="hidden md:flex mb-8 justify-between">
          {formSections.map((_, idx) => {
            return (
              <div
                key={idx}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  idx <= section ? "bg-primary" : "bg-muted"
                )}
              />
            );
          })}
        </div>

        <Card className="overflow-hidden shadow-lg border">
          <CardHeader className="bg-card border-b">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded-lg text-primary">
                {formSections[section].icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-card-foreground">
                  {formSections[section].title}
                </h2>
                <p className="text-muted-foreground">
                  {formSections[section].description}
                </p>
              </div>
            </div>
          </CardHeader>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={section}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formSections[section].component}
                  </motion.div>
                </AnimatePresence>
              </CardContent>

              <CardFooter className="flex justify-between items-center p-6 bg-muted/40 border-t">
                {section > 0 && (
                  <Button
                    type="button"
                    onClick={() => handlePreviousSection()}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>
                )}

                {section === 0 && <div />}

                {section < formSections.length - 1 ? (
                  <Button
                    type="button"
                    onClick={() =>
                      handleNextSection(formSections[section].schema)
                    }
                    className="ml-auto flex items-center gap-1"
                  >
                    {loading ? (
                      <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={async () => {
                      // Validate the last section before submitting
                      const sectionSchema = formSections[section].schema;
                      const sectionKeys = getSchemaKeys(sectionSchema);

                      const isValid = await form.trigger(sectionKeys);
                      if (isValid) {
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    variant="default"
                    className="ml-auto flex items-center gap-1 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    Submit Offer
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </form>
          </FormProvider>
        </Card>
      </div>

      <LoadingOverlay
        loading={loading}
        status={status}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default page;
