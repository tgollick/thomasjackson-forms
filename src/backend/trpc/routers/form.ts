// fileRouter.ts
import { createTRPCRouter, publicProcedure } from "../init";
import { z } from "zod";
import { prisma } from "@/utils/prisma";
import {
  CurrentSituation,
  MaritalStatus,
  EmploymentStatus,
  BuyerOffer,
} from "@prisma/client";
import { rentalApplicationSchema } from "@/utils/tenancyApplicationSchema";
import { buyerOfferSchema } from "@/utils/buyerOfferSchema";

// Public endpoint for generating upload URLs
export const formRouter = createTRPCRouter({
  tenantApplicationSubmission: publicProcedure
    .input(rentalApplicationSchema)
    .mutation(async ({ input }) => {
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
  buyerOfferSubmission: publicProcedure
    .input(buyerOfferSchema)
    .mutation(async ({ input }) => {
      const { identificationUploads, fundProofUpload, ...cleanInputs } = input;

      try {
        const buyerOffer = await prisma.buyerOffer.create({
          data: {
            propertyAddress: cleanInputs.propertyAddress,
            buyerNames: cleanInputs.buyerNames,
            currentAddress: cleanInputs.currentAddress,
            identificationUploadKeys: identificationUploads.map(
              (file) => file.name
            ),
            fundPurchase: cleanInputs.fundPurchase,
            fundProof: cleanInputs.fundProof,
            fundProofKey: "123456",
            depositAmount: cleanInputs.depositAmount,
            depositDetails: cleanInputs.depositDetails,
            requireMortgage: cleanInputs.requireMortgage,
            brokerContact: cleanInputs.brokerContact,
            politicallyExposed: cleanInputs.politicallyExposed,
            politicallyExposedDetails: cleanInputs.politicallyExposedDetails,
            declarationNames: cleanInputs.declarationNames,
            declarationSignature: cleanInputs.declarationSignature,
            declarationDate: cleanInputs.declarationDate,

            // Create nested mortgage broker if required
            ...(cleanInputs.requireMortgage && cleanInputs.mortgageBroker
              ? {
                  mortgageBroker: {
                    create: {
                      name: cleanInputs.mortgageBroker.name,
                      address: cleanInputs.mortgageBroker.address,
                      phone: cleanInputs.mortgageBroker.phone,
                      email: cleanInputs.mortgageBroker.email,
                    },
                  },
                }
              : {}),

            // Create nested solicitor
            solicitor: {
              create: {
                name: cleanInputs.solicitor.name,
                address: cleanInputs.solicitor.address,
                phone: cleanInputs.solicitor.phone,
                email: cleanInputs.solicitor.email,
              },
            },
          },
        });

        return {
          success: true,
          applicationId: buyerOffer.id,
          message: "Application submitted successfully!",
        };
      } catch (err) {
        console.error("Error submitting buyer offer:", err);
        return {
          success: false,
          error: String(err),
          message: "Error submitting buyer offer. Check server logs.",
        };
      }
    }),
});
