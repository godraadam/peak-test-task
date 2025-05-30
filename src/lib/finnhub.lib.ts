import wretch from "wretch";

import { env } from "@/config";
import { StockPriceCreate } from "@/db/schema/stock-prices.schema";
import { StockSelect } from "@/db/schema/stocks.schema";

const finnhubClient = wretch(env.FINNHUB_API_URL).headers({
  "X-Finnhub-Token": env.FINNHUB_API_KEY,
});

type FinnhubQuoteResponse = {
  c: number; // Current price
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp of the quote
};

export async function fetchStockPricesFromFinnhub(
  stocks: Array<StockSelect>
): Promise<Array<StockPriceCreate>> {
  const responses = await Promise.allSettled(
    stocks.map(({ tickerSymbol }) => {
      return finnhubClient
        .get(`/quote?symbol=${tickerSymbol}`)
        .json<FinnhubQuoteResponse>();
    })
  );

  return responses
    .map((response, index) => {
      if (response.status === "rejected") {
        console.error(
          `Failed to fetch price for ${stocks[index]!.tickerSymbol}:`,
          response.reason
        );
        return undefined;
      }

      return {
        stockId: stocks[index]!.id,
        value: Number(response.value.c),
      };
    })
    .filter((it) => it !== undefined);
}
