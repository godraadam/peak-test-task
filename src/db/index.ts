import { env } from "@/config";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle({
  connection: {
    connectionString: env.PG_CONNECTION_STRING,
    ssl: false,
  },
});
