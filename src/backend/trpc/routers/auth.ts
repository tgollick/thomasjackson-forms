import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/utils/prisma";
import { verifyPassword, createToken } from "@/utils/auth";
import { createTRPCRouter, publicProcedure } from "../init";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
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

      // Return response headers instead of setting them directly
      return {
        success: true,
        headers: {
          "Set-Cookie": `authToken=${token}; HttpOnly; Path=/; Secure; SameSite=Strict; Max-Age=3600`,
        },
      };
    }),

  logout: publicProcedure.mutation(() => {
    // Return response headers to clear cookie
    return {
      success: true,
      headers: {
        "Set-Cookie": `authToken=; HttpOnly; Path=/; Secure; SameSite=Strict; Max-Age=0`,
      },
    };
  }),
});
