import { date, pgTable, serial, text } from "drizzle-orm/pg-core"

export const productSchema = pgTable("products", {
  id: serial("id").primaryKey(),
  title: text("title"),
  tags: text("tags"),
  created_at: date("created_at").defaultNow(),
  updated_at: date("updated_at").defaultNow(),
  sku: text("sku")
})
