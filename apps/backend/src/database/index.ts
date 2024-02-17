import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

// Ensure the database URL is set, otherwise no point in running the app
if (typeof process.env.DATABASE_URL !== "string") {
  throw new Error("DATABASE_URL environment variable must be set");
}

const poolConnection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  timezone: "+00:00",
});

export const db = drizzle(poolConnection, { schema, mode: "default" });
