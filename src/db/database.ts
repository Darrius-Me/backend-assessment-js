import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { config } from 'dotenv'
config()
import pkg from 'pg'
const { Pool } = pkg

//Construct postgres URL using env variables
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env
export const dbURL = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`

//Create pool of conenctions using the URL
const pool = new Pool({
  connectionString: dbURL,
})

//Initialize drizzle ORM with the connection pool
export const database = drizzle(pool)
