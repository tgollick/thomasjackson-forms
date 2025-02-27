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
        // Property Details
        propertyAddress: z.string().min(1, "Property address is required"),
        rentalAmount: z
          .number()
          .min(0, "Rental amount must be a positive number"),
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

        // File uploads
        idFileKey: z.string(),
        poaFileKey: z.string(),
        bankStatementFileKey: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.rentalApplication.create({
          data: {
            ...input,
          },
        });

        return {
          success: true,
          message:
            "Your form response has been successfully submitted, thanks!",
        };
      } catch (err) {
        return {
          success: false,
          error: err,
          message:
            "There was an error uploading your form response, please try again...",
        };
      }
    }),
});
