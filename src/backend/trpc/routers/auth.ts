import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/utils/prisma";
import { verifyPassword, createToken, verifyToken } from "@/utils/auth";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";
import { cookies } from "next/headers";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email: input.email },
        });

        if (!user || !(await verifyPassword(user.password, input.password))) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid credentials",
          });
        }

        const token = createToken(user.id);

        const cookieStore = await cookies();
        cookieStore.set("authToken", token);

        return {
          success: true,
          message: "Successfully logged in and generated auth token",
        };
      } catch (err) {
        return new TRPCError({
          message: err as string,
          code: "INTERNAL_SERVER_ERROR",
        });
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
