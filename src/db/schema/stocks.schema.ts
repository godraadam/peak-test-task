import {
  pgTable,
  text,
  boolean,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import z from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const stocksTable = pgTable("stocks", {
  id: text().primaryKey().$defaultFn(createId),
  // could use citext extension for case-insensitive uniqueness, but feels like overkill, we can ensure that on app level
  tickerSymbol: text("ticker_symbol").notNull().unique(),
  // true if live data should be fetched for this stock
  sync: boolean().notNull().default(true),
  rollingAvg: numeric("rolling_avg", { scale: 10, mode: "number" }),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .default(sql`now()`),
  // could add a trigger to auto update this but for now we can just do it manually on app level
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export const stockCreatePayloadSchema = createInsertSchema(stocksTable).omit({
  id: true,
  createdAt: true,
  rollingAvg: true,
  updatedAt: true,
});

export const stockUpdatePayloadSchema = stockCreatePayloadSchema
  .omit({ tickerSymbol: true })
  .partial();

export const stockSelectSchema = createSelectSchema(stocksTable);

export type StockCreate = z.infer<typeof stockCreatePayloadSchema>;
export type StockUpdate = z.infer<typeof stockUpdatePayloadSchema>;
export type StockSelect = z.infer<typeof stockSelectSchema>;
