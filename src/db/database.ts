import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { config } from 'dotenv'
config()
import pkg from 'pg'
const { Pool } = pkg

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env
export const dbURL = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`

const pool = new Pool({
  connectionString: dbURL,
})

export const database = drizzle(pool)
