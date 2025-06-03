import { Router } from "express";
import { serve, setup } from "swagger-ui-express";

import { stocksRouter } from "@/api/routes/v1/stocks.router";
import { swaggerDocument } from "@/lib/openapi.lib";

export const v1Router = Router();

v1Router.use("/stocks", stocksRouter);
v1Router.use("/docs", serve, setup(swaggerDocument));
