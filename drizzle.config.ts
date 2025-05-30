import { defineConfig } from "drizzle-kit";
import { env } from "@/config";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema",
  out: "./migrations",
  dbCredentials: {
    url: env.PG_CONNECTION_STRING,
  },
});
