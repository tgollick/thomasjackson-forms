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
      setSection((currentSection) => currentSection + 1);
    }
  };

  const formSections = [
    {
      title: "Property & Rental Details",
      component: <PropertyDetails />,
      schema: propertyRentalDetailsSchema,
    },
    {
      title: "Personal Details",
      component: <PersonalDetails />,
      schema: personalDetailsSchema,
    },
    {
      title: "Previous Addresses",
      component: <PreviousAddresses />,
      schema: previousAddressesSchema,
    },
    {
      title: "Living Situation",
      component: <LivingSituation />,
      schema: livingSituationSchema,
    },
    {
      title: "Household Information",
      component: <HouseholdInformation />,
      schema: householdInformationSchema,
    },
    {
      title: "Pets & Smoking",
      component: <PetsSmoking />,
      schema: petsSmokingSchema,
    },
    {
      title: "Moving & Document Proofs",
      component: <MovingDocumentProofs />,
      schema: movingAndProofsSchema,
    },
    {
      title: "Employment Details",
      component: <EmploymentDetails />,
      schema: employmentDetailsSchema,
    },
    {
      title: "Employed Details",
      component: <EmployedDetails />,
      schema: employedDetailsSchema,
    },
    {
      title: "Previous Employer Details",
      component: <PreviousEmployerDetails />,
      schema: previousEmployerSchema,
    },
    {
      title: "Self-Employed Details",
      component: <SelfEmployedDetails />,
      schema: selfEmployedDetailsSchema,
    },
    {
      title: "Financial & Legal Information",
      component: <FinancialLegalInformation />,
      schema: financialLegalSchema,
    },
    {
      title: "Guarantor Information",
      component: <GuarantorInformation />,
      schema: guarantorSchema,
    },
    {
      title: "Utilities Arrears",
      component: <UtilitiesArrears />,
      schema: utilitiesArrearsSchema,
    },
    {
      title: "Debts Payment",
      component: <DebtsPayment />,
      schema: debtsPaymentSchema,
    },
    {
      title: "Next of Kin",
      component: <NextOfKin />,
      schema: nextOfKinSchema,
    },
    {
      title: "Declaration",
      component: <Declaration />,
      schema: declarationSchema,
    },
  ];

  const onSubmit = (values: RentalApplicationForm) => {
    console.log(values);
  };

  return (
    <section>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <section>{formSections[section].component}</section>
          <div className="flex justify-between mt-4">
            {section > 0 && (
              <button type="button" onClick={() => setSection(section - 1)}>
                Previous
              </button>
            )}
            {section < formSections.length - 1 ? (
              <button
                type="button"
                onClick={() => handleNextSection(formSections[section].schema)}
              >
                Next
              </button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
