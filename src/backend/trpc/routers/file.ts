// fileRouter.ts
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";
import { generateUploadURL, generateDownloadURL } from "@/utils/s3";
import { z } from "zod";

// Public endpoint for generating upload URLs
export const fileRouter = createTRPCRouter({
  getUploadURL: publicProcedure
    .input(z.object({ fileName: z.string() }))
    .mutation(async ({ input }) => {
      const key = `uploads/${Date()}_${input.fileName}`;
      const uploadUrl = await generateUploadURL(key);
      // Optionally, store the key in your PostgreSQL DB as part of the form submission
      return { uploadUrl, key };
    }),
  // Protected endpoint for generating download URLs
  getDownloadURL: protectedProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      const downloadUrl = await generateDownloadURL(input.key);
      return { downloadUrl };
    }),
});
