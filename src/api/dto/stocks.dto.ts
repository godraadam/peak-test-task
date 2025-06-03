import z from "zod";

export const getStockBySymbolValidator = z
  .object({
    ticker: z.string().transform((it) => it.toUpperCase()),
  })
  .openapi({
    description: "Validator for getting stock by ticker symbol",
    example: { ticker: "AAPL" },
    effectType: "same",
  });
