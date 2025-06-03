import { Router } from "express";
import z from "zod";

import { paginationValidator } from "@/api/dto/pagination.dto";
import { getStockBySymbolValidator } from "@/api/dto/stocks.dto";
import { validate } from "@/api/routes/v1/middleware";
import { getStockByTicker, getStocks, getTotalStocksCount, insertStock, updateStock } from "@/db/query/stock.query";
import { stockCreatePayloadSchema } from "@/db/schema/stocks.schema";
import { getStockPriceInfo } from "@/service/stock-prices.service";

export const stocksRouter = Router();

stocksRouter.get(
  "/",
  validate(
    {
      query: paginationValidator,
    },
    async (req, res) => {
      const payload = req.query;
      const totalCount = await getTotalStocksCount();
      const stocks = await getStocks(payload);

      return res.send({
        data: stocks,
        meta: { offset: payload.offset, limit: payload.limit, totalCount },
      });
    },
  ),
);

stocksRouter.get(
  "/:ticker",
  validate(
    {
      params: getStockBySymbolValidator,
    },
    async (req, res) => {
      const tickerSymbol = req.params.ticker;
      const stock = await getStockByTicker(tickerSymbol);

      if (!stock) {
        return res.status(404).send({
          message: `Stock with ticker symbol ${tickerSymbol} not found!`,
        });
      }
      const stockPriceInfo = await getStockPriceInfo(stock.id);

      return res.send({
        symbol: stock.tickerSymbol,
        ...stockPriceInfo,
      });
    },
  ),
);

stocksRouter.post(
  "/",
  validate(
    {
      body: stockCreatePayloadSchema,
    },
    async (req, res) => {
      const payload = req.body;

      const maybeStock = await getStockByTicker(payload.tickerSymbol);

      if (maybeStock) {
        return res.status(409).send({
          message: `Stock with ticker symbol ${payload.tickerSymbol} already exists.`,
        });
      }
      const inserted = await insertStock(payload);

      if (!inserted) {
        return res.status(500).send({
          message: "Failed to insert stock.",
        });
      }

      return res.status(201).send({ inserted });
    },
  ),
);

stocksRouter.put(
  "/:ticker",
  validate(
    {
      params: z.object({
        ticker: z.string().transform((it) => it.toUpperCase()),
      }),
      body: z.object({
        sync: z.coerce.boolean().optional(),
      }),
    },
    async (req, res) => {
      const tickerSymbol = req.params.ticker;
      const payload = req.body;

      const maybeStock = await getStockByTicker(tickerSymbol);

      if (!maybeStock) {
        return res.status(404).send({
          message: `Stock with ticker symbol ${tickerSymbol} not found!`,
        });
      }

      const updated = await updateStock(maybeStock.id, payload);

      return res.send({ updated });
    },
  ),
);
