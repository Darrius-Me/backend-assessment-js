import { defineConfig } from "drizzle-kit"
import { config } from 'dotenv'
config()

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env
const dbURL = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/migrations",
  dbCredentials: {
    url: dbURL
  }
})