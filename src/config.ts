import { config } from "dotenv";
import { z } from "zod";

const appModes = ["dev", "stage", "prod", "test"] as const;
type AppMode = (typeof appModes)[number];

// based on APP_MODE env var, get the correct .env file
const appMode = process.env.APP_MODE ?? "dev";

function checkAppMode(appMode: string): appMode is AppMode {
  // @ts-expect-error narrow type checking not needed here
  return appModes.includes(appMode);
}

if (!checkAppMode(appMode)) {
  console.log("Unknown application mode!");
  process.exit(1);
}

const dotEnvMap: Record<AppMode, `.env.${AppMode}`> = {
  dev: ".env.dev",
  stage: ".env.stage",
  prod: ".env.prod",
  test: ".env.test",
} as const;

// load values from .env into process.env
config({ path: dotEnvMap[appMode] });

// parse process.env to make sure all needed env vars are present
export const env = z
  .object({
    SYNC_INTERVAL: z.string().optional().default("1 min"),
    PG_CONNECTION_STRING: z.string(),
    FINNHUB_API_KEY: z.string(),
    FINNHUB_API_URL: z.string().optional().default("https://finnhub.io/api/v1"),
  })
  .parse(process.env);
