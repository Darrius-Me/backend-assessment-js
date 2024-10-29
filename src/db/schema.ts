import { bigint, date, pgTable, serial, text } from "drizzle-orm/pg-core"

export const productSchema = pgTable("products", {
  id: serial("id").primaryKey(),
  productID: bigint({ mode: 'number' }),
  title: text("title"),
  tags: text("tags"),
  created_at: date("created_at"),
  updated_at: date("updated_at"),
  sku: text("sku")
})
