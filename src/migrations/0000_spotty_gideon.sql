CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"productID" bigint,
	"title" text,
	"tags" text,
	"created_at" date,
	"updated_at" date,
	"sku" text
);
