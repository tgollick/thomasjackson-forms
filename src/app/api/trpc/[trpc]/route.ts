import { NextRequest, NextResponse } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "@/backend/trpc/init";
import { appRouter } from "@/backend/trpc/routers/_app";

const handler = async (req: NextRequest) => {
  const trpcResponse = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });

  return trpcResponse;
};

export { handler as GET, handler as POST };
