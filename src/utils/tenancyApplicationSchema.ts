// src/schemas/rentalApplication.ts
import { z } from "zod";

export const previousAddressSchema = z.object({
  address: z.string().nonempty("Address is required"),
  postCode: z.string().nonempty("Postcode is required"),
  timeAtAddress: z.string().nonempty("Time at address is required"),
});

export const landlordDetailsSchema = z.object({
  name: z.string().nonempty("Landlord name is required"),
  address: z.string().nonempty("Landlord address is required"),
  telephone: z.string().nonempty("Landlord telephone is required"),
});

export const employedDetailsSchema = z.object({
  jobTitle: z.string().nonempty("Job title is required"),
  companyName: z.string().nonempty("Company name is required"),
  employerAddress: z.string().nonempty("Employer address is required"),
  employerPostCode: z.string().nonempty("Employer postcode is required"),
  employerTelephone: z.string().nonempty("Employer telephone is required"),
  employerEmail: z.string().email("Invalid employer email"),
  timeEmployed: z.string().nonempty("Time employed is required"),
  currentSalary: z.number({ invalid_type_error: "Salary must be a number" }),
  nationalInsuranceNumber: z.string().nonempty("NI number is required"),
});

export const previousEmployerSchema = z.object({
  jobTitle: z.string().nonempty("Previous job title is required"),
  companyName: z.string().nonempty("Previous company name is required"),
  employerAddress: z.string().nonempty("Employer address is required"),
  employerPostCode: z.string().nonempty("Employer postcode is required"),
  employerTelephone: z.string().nonempty("Employer telephone is required"),
  employerEmail: z.string().email("Invalid employer email"),
  timeEmployed: z.string().nonempty("Time employed is required"),
  previousSalary: z.number({ invalid_type_error: "Salary must be a number" }),
});

export const selfEmployedDetailsSchema = z.object({
  jobTitle: z.string().nonempty("Job title is required"),
  companyName: z.string().nonempty("Company name is required"),
  companyAddress: z.string().nonempty("Company address is required"),
  accountant: z.object({
    name: z.string().nonempty("Accountant name is required"),
    address: z.string().nonempty("Accountant address is required"),
    phone: z.string().nonempty("Accountant phone is required"),
    email: z.string().email("Invalid accountant email"),
  }),
  businessReference: z.object({
    name: z.string().nonempty("Business reference name is required"),
    address: z.string().nonempty("Business reference address is required"),
    phone: z.string().nonempty("Business reference phone is required"),
    email: z.string().email("Invalid business reference email"),
  }),
});

export const guarantorSchema = z.object({
  canProvide: z.boolean(),
  name: z.string().optional(),
  address: z.string().optional(),
  postCode: z.string().optional(),
  telephone: z.string().optional(),
  email: z.string().email().optional(),
  timeAtAddress: z.string().optional(),
  newAddressDetails: z
    .object({
      address: z.string().optional(),
      postCode: z.string().optional(),
      telephone: z.string().optional(),
      email: z.string().email().optional(),
    })
    .optional(),
  signature: z.string().optional(),
  date: z.string().datetime().optional(),
});

export const utilitiesArrearsSchema = z.object({
  councilTax: z.boolean(),
  electric: z.boolean(),
  water: z.boolean(),
  tvLicence: z.boolean(),
});

export const nextOfKinSchema = z.object({
  name: z.string().nonempty("Next of kin name is required"),
  address: z.string().nonempty("Next of kin address is required"),
  contactDetails: z.string().nonempty("Contact details are required"),
  relationship: z.string().nonempty("Relationship is required"),
});

export const declarationSchema = z.object({
  printedName: z.string().nonempty("Printed name is required"),
  signature: z.string().nonempty("Signature is required"),
  date: z.string().datetime(),
});

export const rentalApplicationSchema = z.object({
  propertyAddress: z.string().nonempty("Property address is required"),
  rentalAmount: z.number({
    invalid_type_error: "Rental amount must be a number",
  }),
  moveInDate: z.string().datetime(),
  fullName: z.string().nonempty("Full name is required"),
  currentAddress: z.string().nonempty("Current address is required"),
  postCode: z.string().nonempty("Postcode is required"),
  timeAtAddress: z.string().nonempty("Time at address is required"),
  telephoneNumber: z.string().nonempty("Telephone number is required"),
  emailAddress: z.string().email("Invalid email address"),
  dateOfBirth: z.string().datetime(),
  previousAddresses: z.array(previousAddressSchema).optional(),
  currentSituation: z.enum([
    "homeowner",
    "rented",
    "livingAtHomeOrWithFriends",
  ]),
  landlordDetails: landlordDetailsSchema.optional(),
  maritalStatus: z.enum(["single", "marriedOrPartner"]),
  householdDetails: z.string().nonempty("Household details are required"),
  pets: z.string().optional(),
  smoker: z.boolean(),
  allowInspection: z.boolean(),
  reasonForMoving: z.string().nonempty("Reason for moving is required"),
  idFileKey: z.string().nonempty("ID file key is required"),
  proofOfAddressFileKey: z
    .string()
    .nonempty("Proof of address file key is required"),
  bankStatementsFileKey: z
    .string()
    .nonempty("Bank statements file key is required"),
  employmentStatus: z.enum([
    "fullTime",
    "partTime",
    "seekingEmployment",
    "unemployed",
    "retired",
    "selfEmployed",
  ]),
  workHours: z.number({ invalid_type_error: "Work hours must be a number" }),
  employedDetails: employedDetailsSchema.optional(),
  previousEmployer: previousEmployerSchema.optional(),
  selfEmployedDetails: selfEmployedDetailsSchema.optional(),
  countyCourtJudgements: z.boolean(),
  countyCourtDetails: z.string().optional(),
  bankruptOrInsolvent: z.boolean(),
  bankruptcyDate: z.string().datetime().optional(),
  evicted: z.boolean(),
  lateRentalPayments: z.boolean(),
  latePaymentDetails: z.string().optional(),
  guarantor: guarantorSchema.optional(),
  utilitiesArrears: utilitiesArrearsSchema.optional(),
  debtsPayment: z.number().optional(),
  nextOfKin: nextOfKinSchema.optional(),
  declaration: declarationSchema.optional(),
});
