import * as dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit';

dotenv.config({path: ".env.local"})

if(!process.env.DATABASE_URL){
    throw new Error("database url is not set in .env")
}

export default defineConfig({
  out: './drizzle',
  schema: './lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    table: "__drizzle_migration",
    schema: "public",
  },
  verbose: true,
  strict: true,  
});
