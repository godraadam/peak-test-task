import { sql } from "drizzle-orm";
import { numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import type z from "zod";

import { stocksTable } from "@/db/schema/stocks.schema";
import { createId } from "@paralleldrive/cuid2";

export const stockPricesTable = pgTable("stock_prices", {
  id: text().primaryKey().$defaultFn(createId),
  stockId: text("stock_id")
    .references(() => stocksTable.id)
    .notNull(),
  // up to 10 digits right of the decimal point, otherwise rounded to 10 decimals
  value: numeric({ mode: "number", scale: 10 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export const stockPriceCreatePayloadSchema = createSelectSchema(stockPricesTable).omit({
  id: true,
  createdAt: true,
});

// never really used but we can have it for later use
export const stockPriceUpdatePayloadSchema = stockPriceCreatePayloadSchema.omit({ stockId: true }).partial();
export type StockPriceCreate = z.infer<typeof stockPriceCreatePayloadSchema>;

export type StockPriceUpdate = z.infer<typeof stockPriceUpdatePayloadSchema>;
