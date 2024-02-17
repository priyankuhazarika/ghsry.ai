import "dotenv/config";
import type { Config } from "drizzle-kit";

if (typeof process.env.DATABASE_URL !== "string") {
  throw new Error("DATABASE_URL environment variable must be set");
}

export default {
  schema: "./src/database/schema.ts",
  out: "./src/database/migrations",
  driver: "mysql2",
  dbCredentials: { uri: process.env.DATABASE_URL },
} satisfies Config;
