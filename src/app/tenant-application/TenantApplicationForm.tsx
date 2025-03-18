"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  rentalApplicationSchema,
  RentalApplicationForm,
  defaultValues,
  declarationSchema,
  nextOfKinSchema,
  debtsPaymentSchema,
  utilitiesArrearsSchema,
  guarantorSchema,
  financialLegalSchema,
  selfEmployedDetailsSchema,
  previousEmployerSchema,
  employedDetailsSchema,
  employmentDetailsSchema,
  movingAndProofsSchema,
  petsSmokingSchema,
  householdInformationSchema,
  livingSituationSchema,
  previousAddressesSchema,
  personalDetailsSchema,
  propertyRentalDetailsSchema,
} from "./tenantApplicationSchema";
import { useState, useEffect } from "react";
import { date, z } from "zod";
import PropertyDetails from "./formSections/PropertyDetails";
import PersonalDetails from "./formSections/PersonalDetails";
import PreviousAddresses from "./formSections/PreviousAddresses";
import LivingSituation from "./formSections/LivingSituation";
import HouseholdInformation from "./formSections/HouseholdInformation";
import PetsSmoking from "./formSections/PetsSmoking";
import MovingDocumentProofs from "./formSections/MovingDocumentProofs";
import EmploymentDetails from "./formSections/EmploymentDetails";
import EmployedDetails from "./formSections/EmployedDetails";
import PreviousEmployer from "./formSections/PreviousEmployerDetails";
import SelfEmployedDetails from "./formSections/SelfEmployedDetails";
import FinancialLegalInformation from "./formSections/FinancialLegalInformation";
import GuarantorInformation from "./formSections/GuarantorInformation";
import UtilitiesArrears from "./formSections/UtilitiesArrears";
import DebtsPayment from "./formSections/DebtsPayment";
import NextOfKin from "./formSections/NextOfKin";
import Declaration from "./formSections/Declaration";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  ChevronRight,
  Home,
  User,
  Calendar,
  FileText,
  BriefcaseBusiness,
  FileCheck,
  Shell,
  Users,
  FileQuestion,
  Ban,
  BadgePoundSterling,
  HeartHandshake,
  FolderArchive,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import tjLogo from "../../../public/tj-logo.svg";
import {
  CurrentSituation,
  EmploymentStatus,
  MaritalStatus,
} from "@prisma/client";

const formSections = [
  {
    title: "Property & Rental Details",
    description:
      "Provide details about the rental property including address and lease terms",
    component: <PropertyDetails />,
    schema: propertyRentalDetailsSchema,
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Personal Details",
    description: "Enter your personal and contact information",
    component: <PersonalDetails />,
    schema: personalDetailsSchema,
    icon: <User className="h-5 w-5" />,
  },
  {
    title: "Previous Addresses",
    description: "List addresses where you have lived in the past",
    component: <PreviousAddresses />,
    schema: previousAddressesSchema,
    icon: <FolderArchive className="h-5 w-5" />,
  },
  {
    title: "Living Situation",
    description: "Describe your current living arrangements",
    component: <LivingSituation />,
    schema: livingSituationSchema,
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Household Information",
    description: "Provide details about your household composition",
    component: <HouseholdInformation />,
    schema: householdInformationSchema,
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Pets & Smoking",
    description: "Information about pets and smoking habits",
    component: <PetsSmoking />,
    schema: petsSmokingSchema,
    icon: <Shell className="h-5 w-5" />,
  },
  {
    title: "Moving & Document Proofs",
    description: "Upload required documents and specify your moving details",
    component: <MovingDocumentProofs />,
    schema: movingAndProofsSchema,
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Employment Details",
    description: "Information about your current employment status",
    component: <EmploymentDetails />,
    schema: employmentDetailsSchema,
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Employed Details",
    description: "Details about your current employment",
    component: <EmployedDetails />,
    schema: employedDetailsSchema,
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Previous Employer",
    description: "Information about your previous employment",
    component: <PreviousEmployer />,
    schema: previousEmployerSchema,
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Self-Employed Details",
    description: "Details specific to self-employment",
    component: <SelfEmployedDetails />,
    schema: selfEmployedDetailsSchema,
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Financial & Legal Information",
    description: "Provide details about your financial and legal history",
    component: <FinancialLegalInformation />,
    schema: financialLegalSchema,
    icon: <BadgePoundSterling className="h-5 w-5" />,
  },
  {
    title: "Guarantor Information",
    description: "Information about your guarantor, if applicable",
    component: <GuarantorInformation />,
    schema: guarantorSchema,
    icon: <HeartHandshake className="h-5 w-5" />,
  },
  {
    title: "Utilities Arrears",
    description: "Information about any utilities arrears",
    component: <UtilitiesArrears />,
    schema: utilitiesArrearsSchema,
    icon: <Ban className="h-5 w-5" />,
  },
  {
    title: "Debts Payment",
    description: "Details about your current debt payments",
    component: <DebtsPayment />,
    schema: debtsPaymentSchema,
    icon: <BadgePoundSterling className="h-5 w-5" />,
  },
  {
    title: "Next of Kin",
    description: "Enter emergency contact information",
    component: <NextOfKin />,
    schema: nextOfKinSchema,
    icon: <User className="h-5 w-5" />,
  },
  {
    title: "Declaration",
    description: "Review and confirm all information is accurate",
    component: <Declaration />,
    schema: declarationSchema,
    icon: <FileCheck className="h-5 w-5" />,
  },
];

export default function TenantApplicationForm() {
  const [section, setSection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  const trpc = useTRPC();
  const router = useRouter();
  const uploadMutation = useMutation(
    trpc.file.getUploadURL.mutationOptions({})
  );

  const tenancyApplicationMutation = useMutation(
    trpc.form.tenantApplicationSubmission.mutationOptions()
  );

  const form = useForm<RentalApplicationForm>({
    resolver: zodResolver(rentalApplicationSchema),
    defaultValues,
    mode: "onChange",
  });

  // Update progress percentage based on current section
  useEffect(() => {
    setFormProgress(Math.round((section / (formSections.length - 1)) * 100));
  }, [section]);

  const handleNextSection = async (sectionSchema: z.ZodObject<any>) => {
    const sectionKeys = Object.keys(
      sectionSchema.shape
    ) as (keyof RentalApplicationForm)[];

    const isValid = await form.trigger(sectionKeys);

    if (isValid) {
      if (section == 1) {
        const yearsAA = form.getValues("timeAtAddress");

        // Parse the years from a string like "4 Years and 3 Months"
        const yearsMatch = yearsAA.match(/(\d+)\s*Years?/i);
        const years = yearsMatch ? parseInt(yearsMatch[1]) : 0;

        if (years > 2) {
          setSection(3);
          return;
        }
      }

      if (section == 7) {
        const employmentType = form.getValues("employmentStatus");

        if (
          employmentType == "retired" ||
          employmentType == "unemployed" ||
          employmentType == "seekingEmployment"
        ) {
          setSection(11);
          return;
        } else if (employmentType == "selfEmployed") {
          setSection(10);
          return;
        }
      }

      if (section == 9) {
        setSection(11);
        return;
      }

      setSection((prevSection) => prevSection + 1);
    }
  };

  const handlePreviousSection = async () => {
    if (section == 3) {
      const yearsAA = form.getValues("timeAtAddress");

      // Parse the years from a string like "4 Years and 3 Months"
      const yearsMatch = yearsAA.match(/(\d+)\s*Years?/i);
      const years = yearsMatch ? parseInt(yearsMatch[1]) : 0;

      if (years > 2) {
        setSection(1);
        return;
      }
    }

    if (section == 9) {
      setSection(7);
      return;
    }

    if (section == 10) {
      setSection(7);
      return;
    }

    if (section == 11) {
      const employmentStatus = await form.getValues("employmentStatus");

      if (employmentStatus == "partTime" || employmentStatus == "fullTime") {
        setSection(9);
        return;
      } else if (
        employmentStatus == "unemployed" ||
        employmentStatus == "retired"
      ) {
        setSection(7);
        return;
      }
    }

    setSection((prevSection) => prevSection - 1);
  };

  const handleFileUpload = async () => {
    const id = form.getValues("id");
    const proofOfAddress = form.getValues("proofOfAddress");
    const bankStatement = form.getValues("bankStatement");

    if (
      id &&
      id.name !== "" &&
      proofOfAddress &&
      proofOfAddress.name !== "" &&
      bankStatement &&
      bankStatement.name !== ""
    ) {
      setIsLoading(true);

      try {
        const idResponse = await uploadMutation.mutateAsync({
          fileName: id.name,
        });

        const poaResponse = await uploadMutation.mutateAsync({
          fileName: proofOfAddress.name,
        });

        const bankStatementResponse = await uploadMutation.mutateAsync({
          fileName: bankStatement.name,
        });

        await fetch(idResponse.uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": id.type,
          },
          body: id,
        });

        await fetch(poaResponse.uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": proofOfAddress.type,
          },
          body: proofOfAddress,
        });

        await fetch(bankStatementResponse.uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": bankStatement.type,
          },
          body: bankStatement,
        });

        toast.success("Files uploaded successfully");

        setIsLoading(false);

        return {
          success: true,
          idFileKey: idResponse.key,
          bankStatementsFileKey: bankStatementResponse.key,
          proofOfAddressFileKey: poaResponse.key,
        };
      } catch (err) {
        toast.error("Failed to upload files");
        setIsLoading(false);
        return false;
      }
    } else {
      toast.error("Please make sure all files are uploaded before submitting");
      setIsLoading(false);
      return false;
    }
  };

  const onSubmit = async (values: RentalApplicationForm) => {
    const { proofOfAddress, bankStatement, id, ...cleanedValues } = values;

    try {
      setIsLoading(true);

      const uploadSuccess = await handleFileUpload();

      if (!uploadSuccess) {
        setIsLoading(false);
        return;
      }

      const formatDateField = (dateString: string): string => {
        return new Date(dateString).toISOString();
      };

      const formattedValues = {
        ...cleanedValues,
        moveInDate: formatDateField(cleanedValues.moveInDate!), // Add ! to assert non-null
        dateOfBirth: formatDateField(cleanedValues.dateOfBirth!),
        bankruptcyDate: cleanedValues.bankruptcyDate
          ? formatDateField(cleanedValues.bankruptcyDate)
          : undefined,
      };

      if (formattedValues.guarantor?.date) {
        formattedValues.guarantor.date = formatDateField(
          formattedValues.guarantor.date
        );
      }

      if (formattedValues.declaration?.date) {
        formattedValues.declaration.date = formatDateField(
          formattedValues.declaration.date
        );
      }

      const payload = {
        ...formattedValues,
        idFileKey: uploadSuccess.idFileKey,
        proofOfAddressFileKey: uploadSuccess.proofOfAddressFileKey,
        bankStatementsFileKey: uploadSuccess.bankStatementsFileKey,
      };

      const response = await tenancyApplicationMutation.mutateAsync(payload);

      if (response.success) {
        toast.success(String(response.message));
        router.push("/thank-you");
      } else {
        toast.error(
          String(response.message) ||
            "There was an error submitting your application."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "There was an error submitting your application. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Image
          src={tjLogo}
          alt="ThomasJackson Logo"
          width="62"
          height="62"
          className="mx-auto mb-8"
        />

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
            Tenant Application Form
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete all sections to submit your application. Your information
            will be reviewed by our team.
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
            // Determine if this section should be considered completed even if skipped
            const isSkippedSection =
              // Previous addresses skipped when time at address > 2
              (idx === 2 && Number(form.getValues("timeAtAddress")) > 2) ||
              // Previous employer skipped for non-employed
              (idx === 9 &&
                !["fullTime", "partTime"].includes(
                  form.getValues("employmentStatus")
                )) ||
              // Self-employed details skipped for non-self-employed
              (idx === 10 &&
                form.getValues("employmentStatus") !== "selfEmployed");

            return (
              <div
                key={idx}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  idx <= section || (section > idx && isSkippedSection)
                    ? "bg-primary"
                    : "bg-muted"
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
                    {isLoading ? (
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
                      const isValid = await form.trigger(
                        Object.keys(
                          formSections[section].schema.shape
                        ) as (keyof RentalApplicationForm)[]
                      );
                      if (isValid) {
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    variant="default"
                    className="ml-auto flex items-center gap-1 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit Application
                        <CheckCircle2 className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
}
