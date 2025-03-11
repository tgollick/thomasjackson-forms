// fileRouter.ts
import { generateUploadURL } from "@/utils/s3";
import { createTRPCRouter, publicProcedure } from "../init";
import { z } from "zod";
import { prisma } from "@/utils/prisma";

// Public endpoint for generating upload URLs
export const formRouter = createTRPCRouter({
  tenantApplicationSubmission: publicProcedure
    .input(
      z.object({
        // Property & Rental Details
        propertyAddress: z.string().nonempty("Property address is required"),
        rentalAmount: z.number({
          invalid_type_error: "Rental amount must be a number",
        }),
        moveInDate: z.string().nonempty("Move-in date is required"),

        // Personal Details
        fullName: z.string().nonempty("Full name is required"),
        currentAddress: z.string().nonempty("Current address is required"),
        postCode: z.string().nonempty("Postcode is required"),
        timeAtAddress: z.number({
          invalid_type_error: "Time at address must be a number",
        }),
        telephoneNumber: z.string().nonempty("Telephone number is required"),
        emailAddress: z.string().email("Invalid email address"),
        dateOfBirth: z.string().nonempty("Date of birth is required"),

        // Previous Addresses (optional array)
        previousAddresses: z
          .array(
            z.object({
              address: z.string().nonempty("Address is required"),
              postCode: z.string().nonempty("Postcode is required"),
              timeAtAddress: z.string().nonempty("Time at address is required"),
            })
          )
          .optional(),

        // Living Situation
        currentSituation: z.enum(
          ["homeowner", "rented", "livingAtHomeOrWithFriends"]
        ),
        // Only required if currentSituation === "rented"
        landlordDetails: z
          .object({
            name: z.string().nonempty("Landlord name is required"),
            address: z.string().nonempty("Landlord address is required"),
            telephone: z.string().nonempty("Landlord telephone is required"),
          })
          .optional(),

        // Household Information
        maritalStatus: z.enum(["single", "marriedOrPartner"]),
        householdDetails: z.string().nonempty("Household details are required"),

        // Pets & Smoking
        pets: z.string().optional(),
        smoker: z.boolean(),
        allowInspection: z.literal(true),

        // Moving & Document Proofs
        reasonForMoving: z.string().nonempty("Reason for moving is required"),
        proofOfAddress: z.any(), // We'll use the file keys instead of the actual files
        bankStatement: z.any(),
        id: z.any(),

        // File keys for uploaded documents
        idFileKey: z.string().nonempty("ID file key is required"),
        proofOfAddressFileKey: z.string().nonempty("Proof of address file key is required"),
        bankStatementsFileKey: z.string().nonempty("Bank statements file key is required"),

        // Employment Details
        employmentStatus: z.enum([
          "fullTime",
          "partTime",
          "seekingEmployment",
          "unemployed",
          "retired",
          "selfEmployed",
        ]),
        workHours: z.number({
          invalid_type_error: "Work hours must be a number",
        }),

        // Employed Section (if applicable)
        employedDetails: z
          .object({
            jobTitle: z.string().nonempty("Job title is required"),
            companyName: z.string().nonempty("Company name is required"),
            employerAddress: z.string().nonempty("Employer address is required"),
            employerPostCode: z.string().nonempty("Employer postcode is required"),
            employerTelephone: z
              .string()
              .nonempty("Employer telephone is required"),
            employerEmail: z.string().email("Invalid employer email"),
            timeEmployed: z.string().nonempty("Time employed is required"),
            currentSalary: z.number({
              invalid_type_error: "Salary must be a number",
            }),
            nationalInsuranceNumber: z.string().nonempty("NI number is required"),
          })
          .optional(),

        // Previous Employer Details (if applicable)
        previousEmployer: z
          .object({
            jobTitle: z.string().nonempty("Previous job title is required"),
            companyName: z.string().nonempty("Previous company name is required"),
            employerAddress: z.string().nonempty("Employer address is required"),
            employerPostCode: z.string().nonempty("Employer postcode is required"),
            employerTelephone: z
              .string()
              .nonempty("Employer telephone is required"),
            employerEmail: z.string().email("Invalid employer email"),
            timeEmployed: z.string().nonempty("Time employed is required"),
            previousSalary: z.number({
              invalid_type_error: "Salary must be a number",
            }),
          })
          .optional(),

        // Self-Employed Details (if applicable)
        selfEmployedDetails: z
          .object({
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
              address: z
                .string()
                .nonempty("Business reference address is required"),
              phone: z.string().nonempty("Business reference phone is required"),
              email: z.string().email("Invalid business reference email"),
            }),
          })
          .optional(),

        // Financial & Legal Information
        countyCourtJudgements: z.boolean(),
        countyCourtDetails: z.string().optional(),
        bankruptOrInsolvent: z.boolean(),
        bankruptcyDate: z.string().optional(),
        evicted: z.boolean(),
        lateRentalPayments: z.boolean(),
        latePaymentDetails: z.string().optional(),

        // Guarantor Information
        guarantor: z
          .object({
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
            date: z.string().optional(),
          })
          .optional(),

        // Utilities Arrears
        utilitiesArrears: z.object({
          councilTax: z.boolean(),
          electric: z.boolean(),
          water: z.boolean(),
          tvLicence: z.boolean(),
        }),

        // Debts Payment
        debtsPayment: z.number().optional(),

        // Next of Kin
        nextOfKin: z.object({
          name: z.string().nonempty("Next of kin name is required"),
          address: z.string().nonempty("Next of kin address is required"),
          contactDetails: z.string().nonempty("Contact details are required"),
          relationship: z.string().nonempty("Relationship is required"),
        }),

        // Declaration
        declaration: z.object({
          printedName: z.string().nonempty("Printed name is required"),
          signature: z.string().nonempty("Signature is required"),
          date: z.string().nonempty("Date is required"),
        }),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Parse dates from strings to Date objects for Prisma
        const moveInDate = new Date(input.moveInDate);
        const dateOfBirth = new Date(input.dateOfBirth);
        const bankruptcyDate = input.bankruptcyDate ? new Date(input.bankruptcyDate) : undefined;
        const guarantorDate = input.guarantor?.date ? new Date(input.guarantor.date) : undefined;
        const declarationDate = new Date(input.declaration.date);

        // Helper function to check if an object has meaningful data (not just empty strings)
        const hasMeaningfulData = (obj: Record<string, any> | undefined): boolean => {
          if (!obj) return false;
          
          // Check if any property has a non-empty value
          return Object.values(obj).some(value => {
            // For nested objects, recursively check
            if (typeof value === 'object' && value !== null) {
              return hasMeaningfulData(value);
            }
            
            // For strings, check if non-empty
            if (typeof value === 'string') {
              return value.trim().length > 0;
            }
            
            // For other types, check if defined and not null
            return value !== undefined && value !== null;
          });
        };

        // Build the data object conditionally
        const createData: any = {
          // Property & Rental Details
          propertyAddress: input.propertyAddress,
          rentalAmount: input.rentalAmount,
          moveInDate: moveInDate,

          // Personal Details
          fullName: input.fullName,
          currentAddress: input.currentAddress,
          postCode: input.postCode,
          timeAtAddress: String(input.timeAtAddress), // Convert to string to match schema
          telephoneNumber: input.telephoneNumber,
          emailAddress: input.emailAddress,
          dateOfBirth: dateOfBirth,

          // Previous Addresses - only create if there are meaningful entries
          ...(input.previousAddresses && input.previousAddresses.length > 0
            ? {
                previousAddresses: {
                  create: input.previousAddresses.filter(addr => 
                    addr.address.trim() !== '' && 
                    addr.postCode.trim() !== '' && 
                    addr.timeAtAddress.trim() !== ''
                  ),
                },
              }
            : {}),

          // Living Situation
          currentSituation: input.currentSituation,
          
          // Landlord Details - only create if situation is "rented" and has meaningful data
          ...(input.currentSituation === 'rented' && input.landlordDetails && 
             hasMeaningfulData(input.landlordDetails)
            ? {
                landlordDetails: {
                  create: {
                    name: input.landlordDetails.name,
                    address: input.landlordDetails.address,
                    telephone: input.landlordDetails.telephone,
                  }
                }
              }
            : {}),

          // Household Information
          maritalStatus: input.maritalStatus,
          householdDetails: input.householdDetails,

          // Pets & Smoking
          pets: input.pets?.trim() || null, // Null if empty string
          smoker: input.smoker,
          allowInspection: input.allowInspection,

          // Moving & Document Proofs
          reasonForMoving: input.reasonForMoving,
          
          // Document handling (file keys from S3 upload)
          idFileKey: input.idFileKey,
          proofOfAddressFileKey: input.proofOfAddressFileKey,
          bankStatementsFileKey: input.bankStatementsFileKey,

          // Employment Details
          employmentStatus: input.employmentStatus,
          workHours: input.workHours,

          // Employed Details - only create if status is full/part time and has meaningful data
          ...(["fullTime", "partTime"].includes(input.employmentStatus) && 
             input.employedDetails && hasMeaningfulData(input.employedDetails)
            ? {
                employedDetails: {
                  create: {
                    jobTitle: input.employedDetails.jobTitle,
                    companyName: input.employedDetails.companyName, 
                    employerAddress: input.employedDetails.employerAddress,
                    employerPostCode: input.employedDetails.employerPostCode,
                    employerTelephone: input.employedDetails.employerTelephone,
                    employerEmail: input.employedDetails.employerEmail,
                    timeEmployed: input.employedDetails.timeEmployed,
                    currentSalary: input.employedDetails.currentSalary,
                    nationalInsuranceNumber: input.employedDetails.nationalInsuranceNumber,
                  }
                }
              }
            : {}),

          // Previous Employer - only create if has meaningful data
          ...(input.previousEmployer && hasMeaningfulData(input.previousEmployer)
            ? {
                previousEmployer: {
                  create: {
                    jobTitle: input.previousEmployer.jobTitle,
                    companyName: input.previousEmployer.companyName,
                    employerAddress: input.previousEmployer.employerAddress,
                    employerPostCode: input.previousEmployer.employerPostCode,
                    employerTelephone: input.previousEmployer.employerTelephone,
                    employerEmail: input.previousEmployer.employerEmail,
                    timeEmployed: input.previousEmployer.timeEmployed,
                    previousSalary: input.previousEmployer.previousSalary,
                  }
                }
              }
            : {}),

          // Self-Employed Details - only create if employment status is self-employed and has meaningful data
          ...(input.employmentStatus === 'selfEmployed' && 
             input.selfEmployedDetails && hasMeaningfulData(input.selfEmployedDetails)
            ? {
                selfEmployedDetails: {
                  create: {
                    jobTitle: input.selfEmployedDetails.jobTitle,
                    companyName: input.selfEmployedDetails.companyName,
                    companyAddress: input.selfEmployedDetails.companyAddress,
                    ...(hasMeaningfulData(input.selfEmployedDetails.accountant)
                      ? {
                          accountant: {
                            create: {
                              name: input.selfEmployedDetails.accountant.name,
                              address: input.selfEmployedDetails.accountant.address,
                              phone: input.selfEmployedDetails.accountant.phone,
                              email: input.selfEmployedDetails.accountant.email,
                            }
                          }
                        }
                      : {}),
                    ...(hasMeaningfulData(input.selfEmployedDetails.businessReference)
                      ? {
                          businessReference: {
                            create: {
                              name: input.selfEmployedDetails.businessReference.name,
                              address: input.selfEmployedDetails.businessReference.address,
                              phone: input.selfEmployedDetails.businessReference.phone,
                              email: input.selfEmployedDetails.businessReference.email,
                            }
                          }
                        }
                      : {})
                  }
                }
              }
            : {}),

          // Financial & Legal Information
          countyCourtJudgements: input.countyCourtJudgements,
          countyCourtDetails: input.countyCourtDetails?.trim() || null,
          bankruptOrInsolvent: input.bankruptOrInsolvent,
          bankruptcyDate: bankruptcyDate,
          evicted: input.evicted,
          lateRentalPayments: input.lateRentalPayments,
          latePaymentDetails: input.latePaymentDetails?.trim() || null,

          // Guarantor Information - only create if user indicated they can provide a guarantor
          ...(input.guarantor && input.guarantor.canProvide && hasMeaningfulData(input.guarantor)
            ? {
                guarantor: {
                  create: {
                    canProvide: input.guarantor.canProvide,
                    name: input.guarantor.name,
                    address: input.guarantor.address,
                    postCode: input.guarantor.postCode,
                    telephone: input.guarantor.telephone,
                    email: input.guarantor.email,
                    timeAtAddress: input.guarantor.timeAtAddress,
                    newAddressDetails: input.guarantor.newAddressDetails && 
                                      hasMeaningfulData(input.guarantor.newAddressDetails) 
                                      ? input.guarantor.newAddressDetails 
                                      : undefined,
                    signature: input.guarantor.signature,
                    date: guarantorDate,
                  }
                }
              }
            : {}),

          // Utilities Arrears - create
          utilitiesArrears: {
            create: {
              councilTax: input.utilitiesArrears.councilTax,
              electric: input.utilitiesArrears.electric,
              water: input.utilitiesArrears.water,
              tvLicence: input.utilitiesArrears.tvLicence,
            }
          },

          // Debts Payment - convert empty or zero values to null
          debtsPayment: input.debtsPayment && input.debtsPayment > 0 ? input.debtsPayment : null,

          // Next of Kin - create if has meaningful data
          ...(hasMeaningfulData(input.nextOfKin)
            ? {
                nextOfKin: {
                  create: {
                    name: input.nextOfKin.name,
                    address: input.nextOfKin.address,
                    contactDetails: input.nextOfKin.contactDetails,
                    relationship: input.nextOfKin.relationship,
                  }
                }
              }
            : {}),

          // Declaration - create
          declaration: {
            create: {
              printedName: input.declaration.printedName,
              signature: input.declaration.signature,
              date: declarationDate,
            }
          }
        };

        // Create the rental application with the conditionally built data
        const rentalApplication = await prisma.rentalApplication.create({
          data: createData
        });

        return {
          success: true,
          applicationId: rentalApplication.id,
          message: "Your rental application has been successfully submitted. Thank you!",
        };
      } catch (err) {
        console.error("Error submitting rental application:", err);
        return {
          success: false,
          error: String(err),
          message: "There was an error submitting your application. Please try again.",
        };
      }
    }),
});
