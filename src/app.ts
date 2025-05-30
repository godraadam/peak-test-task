import express from "express";
import cron from "node-cron";

import { fetchStockPrices } from "@/service/stock-prices.service";
import { indexRouter } from "@/api/routes/index.router";

const app = express();

app.use(express.json());

app.use("/api", indexRouter);

app.listen(8080, () =>
  console.log("Server is running on http://localhost:8080/api/v1")
);

// fetch real-time stock prices every minute
cron.schedule("* * * * *", fetchStockPrices);
