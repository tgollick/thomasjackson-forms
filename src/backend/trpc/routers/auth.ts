import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/utils/prisma";
import { verifyPassword, createToken, verifyToken } from "@/utils/auth";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";
import { cookies } from "next/headers";
import { generate2FA } from "@/utils/generate2FA";
import { getRandomValues } from "crypto";
import { sendVerificationEmail } from "@/utils/send2FA";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email: input.email },
        });

        if (!user || !(await verifyPassword(user.password, input.password))) {
          return {
            success: false,
            message: "The information provided is incorrect, please try again",
          };
        }

        const verificationCode = generate2FA();

        await prisma.verificationCodes.create({
          data: {
            email: input.email,
            code: verificationCode,
          },
        });

        const emailResponse = await sendVerificationEmail(
          verificationCode,
          user.email
        );

        if (!emailResponse) {
          return {
            success: false,
            message: "There was an error sending the email verification code",
          };
        }

        if (!emailResponse.success) {
          console.log(emailResponse.code);
          return {
            success: false,
            message: emailResponse.message,
          };
        }

        return {
          success: true,
          message: emailResponse.message,
        };
      } catch (err) {
        return {
          success: false,
          message:
            "There has been an error logging you in, please try again" + err,
        };
      }
    }),

  verify2fa: publicProcedure
    .input(
      z.object({
        email: z.string(),
        code: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email: input.email },
        });

        if (!user) {
          return {
            success: false,
            message: "Cannot find user, please login again",
          };
        }

        const data = await prisma.verificationCodes.findUnique({
          where: {
            email: input.email,
            code: input.code,
          },
        });

        if (!data || data.code != input.code) {
          return {
            success: false,
            message: "Incorrect Verification Code, please try again",
          };
        }

        if (data.expiry < new Date()) {
          return {
            success: false,
            message: "Your verification code has expired, please try again",
          };
        }

        const authToken = createToken(user?.id);
        const cookieStore = await cookies();
        cookieStore.set("authToken", authToken);

        return {
          success: true,
          message: "2FA code verified successfully!",
        };
      } catch (err) {
        return {
          success: false,
          message:
            "There has been an error verifying your 2FA code, please try again: " +
            err,
        };
      }
    }),
  logout: protectedProcedure.mutation(async () => {
    try {
      const cookieStore = await cookies();
      cookieStore.delete("authToken");

      return {
        success: true,
        message: "Successfully Logged Out",
      };
    } catch (err) {
      return new TRPCError({
        message: "Error logging out",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
  getUser: protectedProcedure
    .input(
      z.object({
        token: z.string().min(1, "Token is required"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = await verifyToken(input.token)?.userId;

        if (!userId) {
          return new TRPCError({
            message: "Could not find userId from token",
            code: "BAD_REQUEST",
          });
        }

        return await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
      } catch (err) {
        return new TRPCError({
          message: "Error Fetching User",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
