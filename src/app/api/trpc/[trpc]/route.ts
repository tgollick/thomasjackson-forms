// in app/api/trpc/[trpc]/route.ts
import { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "@/backend/trpc/init";
import { appRouter } from "@/backend/trpc/routers/_app";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext({ req }),
    responseMeta: ({ ctx, type, errors, data }) => {
      // We need to properly type the headers
      const responseHeaders: Record<string, string> = {};

      // Check if data exists and has the expected shape
      if (
        type === "mutation" &&
        data &&
        typeof data === "object" &&
        "headers" in data &&
        data.headers &&
        typeof data.headers === "object"
      ) {
        // Extract headers if they exist
        const headers = data.headers as Record<string, string>;
        Object.keys(headers).forEach((key) => {
          responseHeaders[key] = headers[key];
        });
      }

      return {
        headers: responseHeaders,
      };
    },
  });

export { handler as GET, handler as POST };
