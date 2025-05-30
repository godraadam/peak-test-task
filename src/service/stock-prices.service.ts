import {
  bulkInsertStockPrices,
  getStockPricesByStockId,
} from "@/db/query/stock-price.query";
import { getStocksToSync } from "@/db/query/stock.query";
import type { StockSelect } from "@/db/schema/stocks.schema";
import { fetchStockPricesFromFinnhub } from "@/lib/finnhub.lib";

export async function fetchStockPrices() {
  const stocksToSync = await getStocksToSync();

  const prices = await fetchStockPricesFromFinnhub(stocksToSync);

  await bulkInsertStockPrices(prices);
}

export async function getStockPriceInfo(id: StockSelect["id"]) {
  const lastTenPrices = await getStockPricesByStockId({
    stockId: id,
    limit: 10,
    offset: 0,
  });

  const rollingAverage =
    lastTenPrices.reduce((acc, price) => acc + price.value, 0) /
    lastTenPrices.length;

  return {
    currentPrice: lastTenPrices[0]?.value,
    rollingAverage,
    lastUpdated: lastTenPrices[0]?.createdAt,
  };
}
