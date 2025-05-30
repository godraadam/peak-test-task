CREATE TABLE "stock_prices" (
	"id" text PRIMARY KEY NOT NULL,
	"stock_id" text NOT NULL,
	"value" numeric NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stocks" (
	"id" text PRIMARY KEY NOT NULL,
	"ticker_symbol" text NOT NULL,
	"sync" boolean,
	"rolling_avg" numeric,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "stocks_ticker_symbol_unique" UNIQUE("ticker_symbol")
);
--> statement-breakpoint
ALTER TABLE "stock_prices" ADD CONSTRAINT "stock_prices_stock_id_stocks_id_fk" FOREIGN KEY ("stock_id") REFERENCES "public"."stocks"("id") ON DELETE no action ON UPDATE no action;