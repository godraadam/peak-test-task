import { Router } from "express";

import { stocksRouter } from "@/api/routes/v1/stocks.router";

export const v1Router = Router();

v1Router.use("/stocks", stocksRouter);
