import wretch from "wretch";

import { env } from "@/config";
import { type StockPriceCreate } from "@/db/schema/stock-prices.schema";
import { type StockSelect } from "@/db/schema/stocks.schema";

const finnhubClient = wretch(env.FINNHUB_API_URL).headers({
  "X-Finnhub-Token": env.FINNHUB_API_KEY,
});

type FinnhubQuoteResponse = {
  c: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
};

export async function fetchStockPricesFromFinnhub(stocks: Array<StockSelect>): Promise<Array<StockPriceCreate>> {
  const responses = await Promise.allSettled(
    stocks.map(({ tickerSymbol }) => {
      return finnhubClient.get(`/quote?symbol=${tickerSymbol}`).json<FinnhubQuoteResponse>();
    }),
  );

  return responses
    .map((response, index) => {
      if (response.status === "rejected") {
        console.error(`Failed to fetch price for ${stocks[index]!.tickerSymbol}:`, response.reason);
        return undefined;
      }

      return {
        stockId: stocks[index]!.id,
        value: Number(response.value.c),
      };
    })
    .filter((it) => it !== undefined);
}
