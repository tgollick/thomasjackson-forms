import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { verifyToken } from "@/utils/auth";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function createContext() {
  let userId: string | null = null;

  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      userId = payload.userId;
    }
  }

  return { userId };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

// Base router and procedure helpers
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action",
    });
  }
  // Pass the userId forward in the context if needed
  return next({ ctx: { userId: ctx.userId } });
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
