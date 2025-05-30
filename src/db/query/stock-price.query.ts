import { eq, desc } from "drizzle-orm";

import { PaginationPayload } from "@/api/dto/pagination.dto";
import { db } from "@/db";
import {
  StockPriceCreate,
  stockPricesTable,
} from "@/db/schema/stock-prices.schema";

export async function bulkInsertStockPrices(payload: Array<StockPriceCreate>) {
  if (payload.length === 0) return;
  return await db.insert(stockPricesTable).values(payload).returning();
}

export async function getStockPricesByStockId({
  stockId,
  limit,
  offset,
}: { stockId: string } & PaginationPayload) {
  return await db
    .select()
    .from(stockPricesTable)
    .where(eq(stockPricesTable.stockId, stockId))
    .orderBy(desc(stockPricesTable.createdAt))
    .limit(limit)
    .offset(offset);
}
