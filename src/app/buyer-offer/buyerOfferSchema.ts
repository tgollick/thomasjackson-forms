import { z } from "zod";

// Define the funding methods
const FundingMethod = z.enum([
  "Cash",
  "Mortgage",
  "Cash from sale",
  "Loan",
  "Savings/ISA/Bonds",
  "Other",
]);

// Define the proof types
const ProofType = z.enum([
  "Bank statement",
  "Agreement in principle",
  "Loan documents",
  "Savings",
]);

// Define MortgageBroker schema
const mortgageBrokerSchema = z.object({
  name: z.string().min(1, "Broker name is required"),
  address: z.string().min(1, "Broker address is required"),
  phone: z.string().min(1, "Broker phone is required"),
  email: z.string().email("Please enter a valid email address"),
});

// Define Solicitor schema
const solicitorSchema = z.object({
  name: z.string().min(1, "Solicitor name is required"),
  address: z.string().min(1, "Solicitor address is required"),
  phone: z.string().min(1, "Solicitor phone is required"),
  email: z.string().email("Please enter a valid email address"),
});

// Custom file validation
const fileSchema = z.instanceof(File, {
  message: "Please upload a valid file",
});

export const personalInfoSchema = z.object({
  propertyAddress: z.string().min(1, "Property address is required"),

  buyerNames: z
    .array(z.string().min(1, "Buyer name is required"))
    .min(1, "At least one buyer name is required"),

  currentAddress: z.string().min(1, "Current address is required"),
});

export const identificationFundsSchema = z.object({
  identificationUploads: z
    .array(fileSchema)
    .min(2, "Please upload at least two forms of identification"),

  fundPurchase: FundingMethod,
  fundProof: ProofType,
  fundProofUpload: z.array(fileSchema).min(1, "Please upload proof of funds"),
});

export const depositMortgageSchema = z.object({
  depositAmount: z.number().positive("Deposit amount must be greater than 0"),
  depositDetails: z
    .string()
    .min(1, "Please explain how you received this money"),

  requireMortgage: z.boolean(),
  brokerContact: z.boolean(),

  mortgageBroker: z.union([z.undefined(), mortgageBrokerSchema]).optional(),

  solicitor: solicitorSchema,
});

export const politicalDeclarationSchema = z.object({
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
});

// Main BuyerOffer schema
export const buyerOfferSchema = z
  .object({
    propertyAddress: z.string().min(1, "Property address is required"),

    buyerNames: z
      .array(z.string().min(1, "Buyer name is required"))
      .min(1, "At least one buyer name is required"),

    currentAddress: z.string().min(1, "Current address is required"),

    identificationUploads: z
      .array(fileSchema)
      .min(2, "Please upload at least two forms of identification"),

    fundPurchase: FundingMethod,
    fundProof: ProofType,
    fundProofUpload: z.array(fileSchema).min(1, "Please upload proof of funds"),

    depositAmount: z.number().positive("Deposit amount must be greater than 0"),
    depositDetails: z
      .string()
      .min(1, "Please explain how you received this money"),

    requireMortgage: z.boolean(),
    brokerContact: z.boolean(),

    mortgageBroker: z.union([z.undefined(), mortgageBrokerSchema]).optional(),

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
      path: ["mortgageBroker"], // This points the error to the mortgageBroker field
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
      path: ["politicallyExposedDetails"], // This points the error to the politicallyExposedDetails field
    }
  );

// Types derived from the schema
export type BuyerOfferFormValues = z.infer<typeof buyerOfferSchema>;

export const defaultValues: BuyerOfferFormValues = {
  propertyAddress: "",
  buyerNames: [""],
  currentAddress: "",
  identificationUploads: [], // Empty array for file uploads
  fundPurchase: "Mortgage",
  fundProof: "Agreement in principle",
  fundProofUpload: [],
  depositAmount: 0,
  depositDetails: "",
  requireMortgage: true,
  brokerContact: false,
  mortgageBroker: {
    name: "",
    address: "",
    phone: "",
    email: "",
  },
  solicitor: {
    name: "",
    address: "",
    phone: "",
    email: "",
  },
  politicallyExposed: false,
  politicallyExposedDetails: "",
  declarationNames: [""],
  declarationSignature: [""],
  declarationDate: new Date(),
};
