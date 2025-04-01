import { z } from "zod";

const fileSchema = z.instanceof(File, {
  message: "Please upload a valid file",
});

// Mortgage Broker Schema
export const mortgageBrokerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Broker name is required"),
  address: z.string().min(1, "Broker address is required"),
  phone: z.string().min(1, "Broker phone is required"),
  email: z.string().email("Please enter a valid email address"),
  buyerOfferId: z.string().optional(),
});

// Solicitor Schema
export const solicitorSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Solicitor name is required"),
  address: z.string().min(1, "Solicitor address is required"),
  phone: z.string().min(1, "Solicitor phone is required"),
  email: z.string().email("Please enter a valid email address"),
  buyerOfferId: z.string().optional(),
});

// Funding Method Enum
export const FundingMethod = z.enum([
  "Cash",
  "Mortgage",
  "Cash from sale",
  "Loan",
  "Savings/ISA/Bonds",
  "Other",
]);

// Proof Type Enum
export const ProofType = z.enum([
  "Bank statement",
  "Agreement in principle",
  "Loan documents",
  "Savings",
]);

// Buyer Offer Schema
export const buyerOfferSchema = z
  .object({
    id: z.string().optional(),
    propertyAddress: z.string().min(1, "Property address is required"),
    buyerNames: z
      .array(z.string().min(1, "Buyer name is required"))
      .min(1, "At least one buyer name is required"),
    currentAddress: z.string().min(1, "Current address is required"),

    identificationUploads: z.array(fileSchema),

    fundPurchase: FundingMethod,
    fundProof: ProofType,
    fundProofUpload: fileSchema,

    depositAmount: z.number().positive("Deposit amount must be greater than 0"),
    depositDetails: z
      .string()
      .min(1, "Please explain how you received this money"),

    requireMortgage: z.boolean(),
    brokerContact: z.boolean(),

    mortgageBroker: mortgageBrokerSchema.optional(),
    solicitor: solicitorSchema,

    politicallyExposed: z.boolean(),
    politicallyExposedDetails: z.string().optional(),

    declarationNames: z
      .array(z.string().min(1, "Declaration name is required"))
      .min(1, "At least one declaration name is required"),
    declarationSignature: z
      .array(z.string().min(1, "Signature is required"))
      .min(1, "At least one signature is required"),
    declarationDate: z.date({
      required_error: "Declaration date is required",
      invalid_type_error: "Declaration date must be a valid date",
    }),

    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .refine(
    (data) => {
      // If mortgage is required, ensure broker details are provided
      if (data.requireMortgage) {
        return (
          !!data.mortgageBroker &&
          Object.keys(data.mortgageBroker).length > 0 &&
          !!data.mortgageBroker.name &&
          !!data.mortgageBroker.address &&
          !!data.mortgageBroker.phone &&
          !!data.mortgageBroker.email
        );
      }
      return true;
    },
    {
      message:
        "Mortgage broker details are required when applying for a mortgage",
      path: ["mortgageBroker"],
    }
  )
  .refine(
    (data) => {
      // If politically exposed, ensure details are provided
      if (data.politicallyExposed) {
        return (
          !!data.politicallyExposedDetails &&
          data.politicallyExposedDetails.trim() !== ""
        );
      }
      return true;
    },
    {
      message: "Please provide details about your politically exposed status",
      path: ["politicallyExposedDetails"],
    }
  );
