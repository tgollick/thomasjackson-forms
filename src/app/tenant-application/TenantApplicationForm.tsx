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
import { useState } from "react";
import { z } from "zod";
import PropertyDetails from "./formSections/PropertyDetails";
import PersonalDetails from "./formSections/PersonalDetails";
import PreviousAddresses from "./formSections/PreviousAddresses";
import LivingSituation from "./formSections/LivingSituation";
import HouseholdInformation from "./formSections/HouseholdInformation";
import PetsSmoking from "./formSections/PetsSmoking";
import MovingDocumentProofs from "./formSections/MovingDocumentProofs";
import EmploymentDetails from "./formSections/EmploymentDetails";
import EmployedDetails from "./formSections/EmployedDetails";
import PreviousEmployerDetails from "./formSections/PreviousEmployerDetails";
import SelfEmployedDetails from "./formSections/SelfEmployedDetails";
import FinancialLegalInformation from "./formSections/FinancialLegalInformation";
import GuarantorInformation from "./formSections/GuarantorInformation";
import UtilitiesArrears from "./formSections/UtilitiesArrears";
import DebtsPayment from "./formSections/DebtsPayment";
import NextOfKin from "./formSections/NextOfKin";
import Declaration from "./formSections/Declaration";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LucideArrowDown,
  LucideArrowDown01,
  LucideArrowUp,
} from "lucide-react";

export default function TenantApplicationForm() {
  const [section, setSection] = useState(0);
  0;
  const form = useForm<RentalApplicationForm>({
    resolver: zodResolver(rentalApplicationSchema),
    defaultValues,
    mode: "onChange",
  });

  const handleNextSection = async (sectionSchema: z.ZodObject<any>) => {
    const sectionKeys = Object.keys(
      sectionSchema.shape
    ) as (keyof RentalApplicationForm)[];
    const isValid = await form.trigger(sectionKeys);
    if (isValid) {
      const yearsAA = form.getValues("timeAtAddress");

      if (section == 1 && yearsAA > 1) {
        setSection(3);
        return;
      }

      setSection((currentSection) => currentSection + 1);
    }
  };

  const formSections = [
    {
      title: "Property & Rental Details",
      description:
        "Provide details about the rental property including address and lease terms",
      component: <PropertyDetails />,
      schema: propertyRentalDetailsSchema,
    },
    {
      title: "Personal Details",
      description:
        "Enter your personal information including full name and contact details",
      component: <PersonalDetails />,
      schema: personalDetailsSchema,
    },
    {
      title: "Previous Addresses",
      description:
        "List your previous residential addresses from the last 3 years",
      component: <PreviousAddresses />,
      schema: previousAddressesSchema,
    },
    {
      title: "Living Situation",
      description: "Describe your current living situation and housing needs",
      component: <LivingSituation />,
      schema: livingSituationSchema,
    },
    {
      title: "Household Information",
      description:
        "Provide information about all household members including relationships",
      component: <HouseholdInformation />,
      schema: householdInformationSchema,
    },
    {
      title: "Pets & Smoking",
      description:
        "Disclose any pets or smoking habits relevant to the tenancy",
      component: <PetsSmoking />,
      schema: petsSmokingSchema,
    },
    {
      title: "Moving & Document Proofs",
      description: "Share your moving timeline and upload required documents",
      component: <MovingDocumentProofs />,
      schema: movingAndProofsSchema,
    },
    {
      title: "Employment Details",
      description: "Select your current employment status type",
      component: <EmploymentDetails />,
      schema: employmentDetailsSchema,
    },
    {
      title: "Employed Details",
      description: "Provide information about your current salaried employment",
      component: <EmployedDetails />,
      schema: employedDetailsSchema,
    },
    {
      title: "Previous Employer Details",
      description: "Enter details of your previous employer (if applicable)",
      component: <PreviousEmployerDetails />,
      schema: previousEmployerSchema,
    },
    {
      title: "Self-Employed Details",
      description:
        "Provide self-employment financial records and tax documents",
      component: <SelfEmployedDetails />,
      schema: selfEmployedDetailsSchema,
    },
    {
      title: "Financial & Legal Information",
      description: "Disclose financial obligations and legal history",
      component: <FinancialLegalInformation />,
      schema: financialLegalSchema,
    },
    {
      title: "Guarantor Information",
      description: "Provide guarantor's contact and financial information",
      component: <GuarantorInformation />,
      schema: guarantorSchema,
    },
    {
      title: "Utilities Arrears",
      description: "Declare any history of overdue utility payments",
      component: <UtilitiesArrears />,
      schema: utilitiesArrearsSchema,
    },
    {
      title: "Debts Payment",
      description: "List any current outstanding debts or repayment plans",
      component: <DebtsPayment />,
      schema: debtsPaymentSchema,
    },
    {
      title: "Next of Kin",
      description: "Provide emergency contact person details",
      component: <NextOfKin />,
      schema: nextOfKinSchema,
    },
    {
      title: "Declaration",
      description: "Review and confirm all information is accurate",
      component: <Declaration />,
      schema: declarationSchema,
    },
  ];

  const onSubmit = (values: RentalApplicationForm) => {
    console.log(values);
  };

  return (
    <section className="w-full h-full max-w-[800px] py-20 px-4">
      <h1 className="w-full text-center mb-2 text-2xl font-semibold">
        {formSections[section].title}
      </h1>

      <p className="text-sm mb-6 w-full text-center">
        {formSections[section].description}
      </p>

      <Card>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <section className="p-6">{formSections[section].component}</section>
            <div className="flex flex-row-reverse items-center justify-between p-6 bg-muted rounded-b-xl">
              {section < formSections.length - 1 ? (
                <Button
                  type="button"
                  onClick={() =>
                    handleNextSection(formSections[section].schema)
                  }
                >
                  Next
                </Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
              {section > 0 && (
                <Button type="button" onClick={() => setSection(section - 1)}>
                  Previous
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </Card>
    </section>
  );
}
