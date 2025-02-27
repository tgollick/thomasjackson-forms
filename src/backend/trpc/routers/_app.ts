import { createTRPCRouter } from "../init";
import { authRouter } from "./auth";
import { fileRouter } from "./file";
import { formRouter } from "./form";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  file: fileRouter,
  form: formRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
