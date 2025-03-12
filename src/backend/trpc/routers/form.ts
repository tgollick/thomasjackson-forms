// fileRouter.ts
import { createTRPCRouter, publicProcedure } from "../init";
import { z } from "zod";
import { prisma } from "@/utils/prisma";
import {
  CurrentSituation,
  MaritalStatus,
  EmploymentStatus,
} from "@prisma/client";
import { rentalApplicationSchema } from "@/utils/tenancyApplicationSchema";

// Public endpoint for generating upload URLs
export const formRouter = createTRPCRouter({
  tenantApplicationSubmission: publicProcedure
    .input(rentalApplicationSchema)
    .mutation(async ({ input }) => {
      //   try {
      //     // Parse dates from strings to Date objects for Prisma
      //     const moveInDate = new Date(input.moveInDate);
      //     const dateOfBirth = new Date(input.dateOfBirth);
      //     const bankruptcyDate = input.bankruptcyDate
      //       ? new Date(input.bankruptcyDate)
      //       : undefined;
      //     const guarantorDate = input.guarantor?.date
      //       ? new Date(input.guarantor.date)
      //       : undefined;
      //     const declarationDate = new Date(input.declaration.date);

      //     // Helper function to check if an object has meaningful data (not just empty strings)
      //     const hasMeaningfulData = (
      //       obj: Record<string, any> | undefined
      //     ): boolean => {
      //       if (!obj) return false;

      //       // Check if any property has a non-empty value
      //       return Object.values(obj).some((value) => {
      //         // For nested objects, recursively check
      //         if (typeof value === "object" && value !== null) {
      //           return hasMeaningfulData(value);
      //         }

      //         // For strings, check if non-empty
      //         if (typeof value === "string") {
      //           return value.trim().length > 0;
      //         }

      //         // For other types, check if defined and not null
      //         return value !== undefined && value !== null;
      //       });
      //     };

      //     // Build the data object conditionally
      //     const createData: any = {
      //       // Property & Rental Details
      //       propertyAddress: input.propertyAddress,
      //       rentalAmount: input.rentalAmount,
      //       moveInDate: moveInDate,

      //       // Personal Details
      //       fullName: input.fullName,
      //       currentAddress: input.currentAddress,
      //       postCode: input.postCode,
      //       timeAtAddress: input.timeAtAddress, // REMOVE String() conversion
      //       telephoneNumber: input.telephoneNumber,
      //       emailAddress: input.emailAddress,
      //       dateOfBirth: dateOfBirth,

      //       // Previous Addresses - only create if there are meaningful entries
      //       ...(input.previousAddresses && input.previousAddresses.length > 0
      //         ? {
      //             previousAddresses: {
      //               create: input.previousAddresses.filter(
      //                 (addr) =>
      //                   addr.address.trim() !== "" &&
      //                   addr.postCode.trim() !== "" &&
      //                   addr.timeAtAddress.trim() !== ""
      //               ),
      //             },
      //           }
      //         : {}),

      //       // Living Situation
      //       currentSituation: input.currentSituation,

      //       // Landlord Details - only create if situation is "rented" and has meaningful data
      //       ...(input.currentSituation === "rented" &&
      //       input.landlordDetails &&
      //       hasMeaningfulData(input.landlordDetails)
      //         ? {
      //             landlordDetails: {
      //               create: {
      //                 name: input.landlordDetails.name,
      //                 address: input.landlordDetails.address,
      //                 telephone: input.landlordDetails.telephone,
      //               },
      //             },
      //           }
      //         : {}),

      //       // Household Information
      //       maritalStatus: input.maritalStatus,
      //       householdDetails: input.householdDetails,

      //       // Pets & Smoking
      //       pets: input.pets?.trim() || null, // Null if empty string
      //       smoker: input.smoker,
      //       allowInspection: input.allowInspection,

      //       // Moving & Document Proofs
      //       reasonForMoving: input.reasonForMoving,

      //       // Document handling (file keys from S3 upload)
      //       idFileKey: input.idFileKey,
      //       proofOfAddressFileKey: input.proofOfAddressFileKey,
      //       bankStatementsFileKey: input.bankStatementsFileKey,

      //       // Employment Details
      //       employmentStatus: input.employmentStatus,
      //       workHours: input.workHours,

      //       // Employed Details - only create if status is full/part time and has meaningful data
      //       ...(["fullTime", "partTime"].includes(input.employmentStatus) &&
      //       input.employedDetails &&
      //       hasMeaningfulData(input.employedDetails)
      //         ? {
      //             employedDetails: {
      //               create: {
      //                 jobTitle: input.employedDetails.jobTitle,
      //                 companyName: input.employedDetails.companyName,
      //                 employerAddress: input.employedDetails.employerAddress,
      //                 employerPostCode: input.employedDetails.employerPostCode,
      //                 employerTelephone: input.employedDetails.employerTelephone,
      //                 employerEmail: input.employedDetails.employerEmail,
      //                 timeEmployed: input.employedDetails.timeEmployed,
      //                 currentSalary: input.employedDetails.currentSalary,
      //                 nationalInsuranceNumber:
      //                   input.employedDetails.nationalInsuranceNumber,
      //               },
      //             },
      //           }
      //         : {}),

      //       // Previous Employer - only create if has meaningful data
      //       ...(input.previousEmployer &&
      //       hasMeaningfulData(input.previousEmployer)
      //         ? {
      //             previousEmployer: {
      //               create: {
      //                 jobTitle: input.previousEmployer.jobTitle,
      //                 companyName: input.previousEmployer.companyName,
      //                 employerAddress: input.previousEmployer.employerAddress,
      //                 employerPostCode: input.previousEmployer.employerPostCode,
      //                 employerTelephone: input.previousEmployer.employerTelephone,
      //                 employerEmail: input.previousEmployer.employerEmail,
      //                 timeEmployed: input.previousEmployer.timeEmployed,
      //                 previousSalary: input.previousEmployer.previousSalary,
      //               },
      //             },
      //           }
      //         : {}),

      //       // Self-Employed Details - only create if employment status is self-employed and has meaningful data
      //       ...(input.employmentStatus === "selfEmployed" &&
      //       input.selfEmployedDetails &&
      //       hasMeaningfulData(input.selfEmployedDetails)
      //         ? {
      //             selfEmployedDetails: {
      //               create: {
      //                 jobTitle: input.selfEmployedDetails.jobTitle,
      //                 companyName: input.selfEmployedDetails.companyName,
      //                 companyAddress: input.selfEmployedDetails.companyAddress,
      //                 ...(hasMeaningfulData(input.selfEmployedDetails.accountant)
      //                   ? {
      //                       accountant: {
      //                         create: {
      //                           name: input.selfEmployedDetails.accountant.name,
      //                           address:
      //                             input.selfEmployedDetails.accountant.address,
      //                           phone: input.selfEmployedDetails.accountant.phone,
      //                           email: input.selfEmployedDetails.accountant.email,
      //                         },
      //                       },
      //                     }
      //                   : {}),
      //                 ...(hasMeaningfulData(
      //                   input.selfEmployedDetails.businessReference
      //                 )
      //                   ? {
      //                       businessReference: {
      //                         create: {
      //                           name: input.selfEmployedDetails.businessReference
      //                             .name,
      //                           address:
      //                             input.selfEmployedDetails.businessReference
      //                               .address,
      //                           phone:
      //                             input.selfEmployedDetails.businessReference
      //                               .phone,
      //                           email:
      //                             input.selfEmployedDetails.businessReference
      //                               .email,
      //                         },
      //                       },
      //                     }
      //                   : {}),
      //               },
      //             },
      //           }
      //         : {}),

      //       // Financial & Legal Information
      //       countyCourtJudgements: input.countyCourtJudgements,
      //       countyCourtDetails: input.countyCourtDetails?.trim() || null,
      //       bankruptOrInsolvent: input.bankruptOrInsolvent,
      //       bankruptcyDate: bankruptcyDate,
      //       evicted: input.evicted,
      //       lateRentalPayments: input.lateRentalPayments,
      //       latePaymentDetails: input.latePaymentDetails?.trim() || null,

      //       // Guarantor Information - only create if user indicated they can provide a guarantor
      //       ...(input.guarantor &&
      //       input.guarantor.canProvide &&
      //       hasMeaningfulData(input.guarantor)
      //         ? {
      //             guarantor: {
      //               create: {
      //                 canProvide: input.guarantor.canProvide,
      //                 name: input.guarantor.name,
      //                 address: input.guarantor.address,
      //                 postCode: input.guarantor.postCode,
      //                 telephone: input.guarantor.telephone,
      //                 email: input.guarantor.email,
      //                 timeAtAddress: input.guarantor.timeAtAddress,
      //                 newAddressDetails:
      //                   input.guarantor.newAddressDetails &&
      //                   hasMeaningfulData(input.guarantor.newAddressDetails)
      //                     ? input.guarantor.newAddressDetails
      //                     : undefined,
      //                 signature: input.guarantor.signature,
      //                 date: guarantorDate,
      //               },
      //             },
      //           }
      //         : {}),

      //       // Utilities Arrears - create
      //       utilitiesArrears: {
      //         create: {
      //           councilTax: input.utilitiesArrears.councilTax,
      //           electric: input.utilitiesArrears.electric,
      //           water: input.utilitiesArrears.water,
      //           tvLicence: input.utilitiesArrears.tvLicence,
      //         },
      //       },

      //       // Debts Payment - convert empty or zero values to null
      //       debtsPayment:
      //         input.debtsPayment && input.debtsPayment > 0
      //           ? input.debtsPayment
      //           : null,

      //       // Next of Kin - create if has meaningful data
      //       ...(hasMeaningfulData(input.nextOfKin)
      //         ? {
      //             nextOfKin: {
      //               create: {
      //                 name: input.nextOfKin.name,
      //                 address: input.nextOfKin.address,
      //                 contactDetails: input.nextOfKin.contactDetails,
      //                 relationship: input.nextOfKin.relationship,
      //               },
      //             },
      //           }
      //         : {}),

      //       // Declaration - create
      //       declaration: {
      //         create: {
      //           printedName: input.declaration.printedName,
      //           signature: input.declaration.signature,
      //           date: declarationDate,
      //         },
      //       },
      //     };

      //     console.log("createData:", JSON.stringify(createData, null, 2)); // Log createData here!

      //     // Create the rental application with the conditionally built data
      //     const rentalApplication = await prisma.rentalApplication.create({
      //       data: createData,
      //     });

      //     return {
      //       success: true,
      //       applicationId: rentalApplication.id,
      //       message:
      //         "Your rental application has been successfully submitted. Thank you!",
      //     };
      //   } catch (err) {
      //     console.error("Error submitting rental application:", err);
      //     return {
      //       success: false,
      //       error: String(err),
      //       message:
      //         "There was an error submitting your application. Please try again.",
      //     };
      //   }
      // }),

      try {
        const rentalApplication = await prisma.rentalApplication.create({
          data: {
            ...input,
            moveInDate: new Date(input.moveInDate),
            dateOfBirth: new Date(input.dateOfBirth),
            bankruptcyDate: input.bankruptcyDate
              ? new Date(input.bankruptcyDate)
              : null,
            guarantor: input.guarantor
              ? { create: input.guarantor }
              : undefined,
            utilitiesArrears: input.utilitiesArrears
              ? { create: input.utilitiesArrears }
              : undefined,
            nextOfKin: input.nextOfKin
              ? { create: input.nextOfKin }
              : undefined,
            declaration: input.declaration
              ? { create: input.declaration }
              : undefined,
            previousAddresses: input.previousAddresses
              ? { create: input.previousAddresses }
              : undefined,
            landlordDetails: input.landlordDetails
              ? { create: input.landlordDetails }
              : undefined,
            employedDetails: input.employedDetails
              ? { create: input.employedDetails }
              : undefined,
            previousEmployer: input.previousEmployer
              ? { create: input.previousEmployer }
              : undefined,
            selfEmployedDetails: input.selfEmployedDetails
              ? {
                  create: {
                    ...input.selfEmployedDetails,
                    accountant: {
                      create: input.selfEmployedDetails.accountant,
                    },
                    businessReference: {
                      create: input.selfEmployedDetails.businessReference,
                    },
                  },
                }
              : undefined,
          },
        });

        return {
          success: true,
          applicationId: rentalApplication.id,
          message: "Application submitted successfully!",
        };
      } catch (err) {
        console.error("Error submitting rental application (simplified):", err);
        return {
          success: false,
          error: String(err),
          message:
            "Error submitting simplified application. Check server logs.",
        };
      }
    }),
});
