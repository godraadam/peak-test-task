import { eq } from "drizzle-orm";

import { type PaginationPayload } from "@/api/dto/pagination.dto";
import { db } from "@/db";
import { type StockCreate, type StockSelect, type StockUpdate, stocksTable } from "@/db/schema/stocks.schema";

export async function getTotalStocksCount() {
  return await db.$count(stocksTable);
}

export async function getStocks({ search, offset, limit }: PaginationPayload) {
  await db
    .select()
    .from(stocksTable)
    .where(search ? eq(stocksTable.tickerSymbol, search) : undefined)
    .offset(offset)
    .limit(limit);
}

export async function getStockByTicker(tickerSymbol: string) {
  const [stock] = await db.select().from(stocksTable).where(eq(stocksTable.tickerSymbol, tickerSymbol)).limit(1);

  return stock;
}

export async function getStocksToSync() {
  return await db.select().from(stocksTable).where(eq(stocksTable.sync, true));
}

export async function insertStock(payload: StockCreate) {
  const [stock] = await db.insert(stocksTable).values(payload).returning();

  return stock;
}

export async function updateStock(id: StockSelect["id"], payload: StockUpdate) {
  const [stock] = await db.update(stocksTable).set(payload).where(eq(stocksTable.id, id)).returning();

  return stock;
}
