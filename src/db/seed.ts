import { seed } from "drizzle-seed";

import { db } from "@/db";
import { stocksTable } from "@/db/schema/stocks.schema";

const exampleSymbols = [
  "AAPL",
  "GOOGL",
  "MSFT",
  "AMZN",
  "TSLA",
  "NVDA",
  "NFLX",
  "META",
  "ADBE",
  "INTC",
  "JPM",
  "BAC",
  "GS",
  "WFC",
  "MS",
  "AXP",
  "C",
  "BA",
  "GE",
  "CAT",
  "XOM",
  "CVX",
  "SLB",
  "HAL",
  "WMT",
  "COST",
  "TGT",
  "HD",
  "MCD",
  "SBUX",
  "NKE",
  "PG",
];

seed(db, { stocks: stocksTable })
  .refine((f) => ({
    stocks: {
      columns: {
        tickerSymbol: f.valuesFromArray({
          values: exampleSymbols,
          isUnique: true,
        }),
        sync: f.boolean(),
      },
      count: 20,
    },
  }))
  .then(() => console.log("Database seeded with 20 example stocks!"))
  .catch(() => console.error("Failed to seed database!"));
