import express from "express";
import type { NextFunction, Request, Response } from "express";
import cron from "node-cron";
import "zod-openapi/extend";

import { indexRouter } from "@/api/routes/index.router";
import { loggingMiddleware } from "@/config/logging.config";
import { fetchStockPrices } from "@/service/stock-prices.service";

const app = express();

app.use(express.json());

app.use(loggingMiddleware);
app.use("/api", indexRouter);

// error handling
// @ts-expect-error express version broken typing
app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  console.error(err);
  if (err instanceof SyntaxError) {
    return res.status(429).send({ reason: "Invalid JSON payload" });
  }
  res.status(500).send({ reason: "Unknown" });
});

app.listen(8080, () => console.log("Server is running on http://localhost:8080/api/v1"));

// fetch real-time stock prices every minute
cron.schedule("* * * * *", fetchStockPrices);
