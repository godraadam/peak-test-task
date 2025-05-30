import { Router } from "express";

import { v1Router } from "@/api/routes/v1/index.router";

export const indexRouter = Router();

indexRouter.use("/v1", v1Router);

