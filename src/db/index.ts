import { drizzle } from "drizzle-orm/node-postgres";

import { env } from "@/config";

export const db = drizzle({
  connection: {
    connectionString: env.PG_CONNECTION_STRING,
    ssl: false,
  },
});
