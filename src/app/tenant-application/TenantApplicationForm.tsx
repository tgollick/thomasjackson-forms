"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import PropertyDetails from "./_components/property-details";
import PersonalInfo from "./_components/personal-info";
import EmploymentInfo from "./_components/employment-info";
import FinancialInfo from "./_components/financial-info";
import AdditionalInfo from "./_components/additional-info";

const formSchema = z.object({
  // Property Details
  propertyAddress: z.string().min(1, "Property address is required"),
  rentalAmount: z.number().min(0, "Rental amount must be a positive number"),
  moveInDate: z.date(),

  // Personal Information
  fullName: z.string().min(1, "Full name is required"),
  currentAddress: z.string().min(1, "Current address is required"),
  postCode: z.string().min(1, "Post code is required"),
  timeAtAddress: z.string().min(1, "Time at address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.date(),
  currentLivingSituation: z.enum([
    "homeowner",
    "renting",
    "living_with_others",
  ]),
  currentLandlordDetails: z.string().optional(),

  // Employment Information
  employmentStatus: z.enum([
    "full_time",
    "part_time",
    "seeking_employment",
    "unemployed",
    "retired",
  ]),
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
  employerAddress: z.string().optional(),
  employmentDuration: z.string().optional(),
  currentSalary: z.number().optional(),

  // Financial Information
  hasCCJ: z.boolean(),
  ccjDetails: z.string().optional(),
  hasBankruptcy: z.boolean(),
  bankruptcyDate: z.date().optional(),
  monthlyDebtPayments: z
    .number()
    .min(0, "Monthly debt payments must be a positive number")
    .optional(),

  // Additional Information
  pets: z.string().optional(),
  isSmoker: z.boolean(),
  allowHomeInspection: z.boolean(),
  reasonForMoving: z.string().min(1, "Reason for moving is required"),
  canProvideDocuments: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  propertyAddress: "",
  rentalAmount: 0,
  moveInDate: new Date(),
  fullName: "",
  currentAddress: "",
  postCode: "",
  timeAtAddress: "",
  phoneNumber: "",
  email: "",
  dateOfBirth: new Date(),
  currentLivingSituation: "renting",
  currentLandlordDetails: "",
  employmentStatus: "full_time",
  jobTitle: "",
  companyName: "",
  employerAddress: "",
  employmentDuration: "",
  currentSalary: 0,
  hasCCJ: false,
  ccjDetails: "",
  hasBankruptcy: false,
  bankruptcyDate: new Date(),
  monthlyDebtPayments: 0,
  pets: "",
  isSmoker: false,
  allowHomeInspection: false,
  reasonForMoving: "",
  canProvideDocuments: false,
};

const steps = [
  {
    title: "Property Details",
    component: PropertyDetails,
    validationSchema: z.object({
      propertyAddress: z.string().min(1),
      rentalAmount: z.number().min(0),
      moveInDate: z.date(),
    }),
  },
  {
    title: "Personal Information",
    component: PersonalInfo,
    validationSchema: z.object({
      fullName: z.string().min(1),
      currentAddress: z.string().min(1),
      postCode: z.string().min(1),
      phoneNumber: z.string().min(1),
      email: z.string().email(),
      dateOfBirth: z.date(),
    }),
  },
  {
    title: "Employment",
    component: EmploymentInfo,
    validationSchema: z.object({
      employmentStatus: z.enum([
        "full_time",
        "part_time",
        "seeking_employment",
        "unemployed",
        "retired",
      ]),
    }),
  },
  {
    title: "Financial Information",
    component: FinancialInfo,
    validationSchema: z.object({
      hasCCJ: z.boolean(),
      hasBankruptcy: z.boolean(),
    }),
  },
  {
    title: "Additional Information",
    component: AdditionalInfo,
    validationSchema: z.object({
      reasonForMoving: z.string().min(1),
      canProvideDocuments: z.boolean(),
    }),
  },
];

export default function TenantApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  const CurrentStepComponent = steps[currentStep].component;

  const slideVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  };

  const validateCurrentStep = async () => {
    const currentStepSchema = steps[currentStep].validationSchema;
    const result = await form.trigger(
      Object.keys(currentStepSchema.shape) as any
    );
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 pt-20 sm:pt-16 md:py-8">
      <h1 className="mb-2 text-3xl font-bold text-center">
        Tenant Application Form
      </h1>
      <p className="mb-8 text-center text-muted-foreground">
        Step {currentStep + 1}: {steps[currentStep].title}
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 0.3 }}
        >
          <Card className="p-6 shadow-lg">
            <motion.div
              className="mb-6 flex justify-between"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    index <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                  variants={{
                    hidden: { scale: 0.8, opacity: 0 },
                    visible: { scale: 1, opacity: 1 },
                  }}
                >
                  {index + 1}
                </motion.div>
              ))}
            </motion.div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <CurrentStepComponent form={form} />
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setCurrentStep((prev) => Math.max(0, prev - 1))
                    }
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  {currentStep < steps.length - 1 ? (
                    <Button type="button" onClick={handleNext}>
                      Next
                    </Button>
                  ) : (
                    <Button type="submit">Submit Application</Button>
                  )}
                </div>
              </form>
            </Form>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
