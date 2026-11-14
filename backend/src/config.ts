import { z } from "zod";

const list = (value: string) =>
  value
    .split(",")
    .map((s) => s.trim().replace(/\/+$/, ""))
    .filter(Boolean);

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(8080),
  DATABASE_URL: z.string().url("DATABASE_URL must be a PostgreSQL connection string."),
  CORS_ORIGIN: z.string().default("").transform(list),
  // How many proxies sit in front of the API (Vercel's /api rewrite + Render = 2).
  TRUST_PROXY: z.coerce.number().int().min(0).default(1),
  MIGRATE_ON_START: z
    .enum(["true", "false"])
    .default("true")
    .transform((v) => v === "true"),
  RESEND_API_KEY: z.string().default(""),
  CONTACT_TO_EMAIL: z.string().email().default("nkokomoukan@gmail.com"),
  CONTACT_FROM_EMAIL: z.string().min(3).default("Portfolio Contact <onboarding@resend.dev>"),
});

export type Config = z.infer<typeof envSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const parsed = envSchema.safeParse(env);
  if (!parsed.success) {
    const problems = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`);
    throw new Error(`Invalid environment configuration:\n${problems.join("\n")}`);
  }
  return parsed.data;
}
