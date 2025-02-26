// env.ts
import { z } from "zod";

// Define the schema as an object with all of the env
// variables and their types
const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "A database url is required, please set in enviroment variables"),
  JWT_SECRET: z
    .string()
    .min(1, "Please enter a JWT secret in enviroment variables"),
  NODE_ENV: z.string().min(1, "Must define the node enviroment"),
  RESEND_API_KEY: z
    .string()
    .min(1, "Please provide a resend api key for email verfication"),
});

// Validate `process.env` against our schema
// and return the result
const env = envSchema.parse(process.env);

// Export the result so we can use it in the project
export default env;
