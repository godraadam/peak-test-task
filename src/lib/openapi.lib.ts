import z from "zod";
import { createDocument } from "zod-openapi";

import { paginationValidator } from "@/api/dto/pagination.dto";
import { getStockBySymbolValidator } from "@/api/dto/stocks.dto";
import { stockCreatePayloadSchema, stockSelectSchema, stockUpdatePayloadSchema } from "@/db/schema/stocks.schema";

/**
 * OpenAPI document for the Peak Backend Test API.
 * This document describes the API endpoints, request parameters, and response schemas.
 *
 * Note: To generate the OpenAPI document, we need to redeclare our paths and their schemas here, which is redundant, and prone to get out fo sync.
 * I would like to once get to a point where we can auto-generate these by introspecting the express routes and handlers.
 * I know that Hono can do this, but that wasn't on the list of options for this test
 */

export const swaggerDocument = createDocument({
  openapi: "3.1.0",
  info: {
    title: "Peak Backend Test Swagger Docs",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  paths: {
    "/api/v1/stocks/{ticker}": {
      get: {
        requestParams: { path: getStockBySymbolValidator },
        summary: "Get stock by ticker symbol",
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": { schema: stockSelectSchema },
            },
          },
        },
      },
      put: {
        requestParams: { path: getStockBySymbolValidator },
        requestBody: {
          content: {
            "application/json": { schema: stockUpdatePayloadSchema },
          },
        },
        summary: "Update an existing stock (e.g. sync status)",
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": { schema: z.object({ updated: stockSelectSchema }) },
            },
          },
        },
      },
    },
    "/api/v1/stocks/": {
      post: {
        requestBody: {
          content: {
            "application/json": { schema: stockCreatePayloadSchema },
          },
        },
        summary: "Register a new stock",
        responses: {
          "201": {
            description: "201 Created",
            content: {
              "application/json": { schema: z.object({ created: stockSelectSchema }) },
            },
          },
        },
      },
      get: {
        requestParams: { query: paginationValidator },
        summary: "Get a list of stocks with pagination",
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": { schema: z.array(stockSelectSchema) },
            },
          },
        },
      },
    },
  },
});
