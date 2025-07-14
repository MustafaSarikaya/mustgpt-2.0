import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NOTION_API_KEY: z.string().min(1),
    NOTION_DATABASE_ID: z.string().min(1),
    NODE_ENV: z.enum(["development", "test", "production"]),
    OPENAI_API_KEY: z.string().min(1),
    OPENAI_ASSISTANT_ID: z.string().min(1),
  },
  client: {
    // Add client-side env vars here if needed
  },
  runtimeEnv: {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NODE_ENV: process.env.NODE_ENV,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_ASSISTANT_ID: process.env.OPENAI_ASSISTANT_ID,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
