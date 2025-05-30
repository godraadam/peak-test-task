ALTER TABLE "stocks" ALTER COLUMN "sync" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "stocks" ALTER COLUMN "sync" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "stock_prices" DROP COLUMN "updated_at";