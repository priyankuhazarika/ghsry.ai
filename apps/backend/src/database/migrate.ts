import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { createConnection } from "mysql2";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Ensure the database URL is set, otherwise can't run migration
if (typeof process.env.DATABASE_URL !== "string") {
  throw new Error("DATABASE_URL environment variable must be set");
}

// Create a new connection. Don't create pool!
const connection = createConnection({
  uri: process.env.DATABASE_URL,
  timezone: "+00:00",
});

// Setup Drizzle
const db = drizzle(connection);

/** The current directory path, not available by default in ES modules */
const __dirname = dirname(fileURLToPath(import.meta.url));

// Run migration
migrate(db, { migrationsFolder: join(__dirname, "migrations") })
  .then(() => console.log("Migration has run succesfully"))
  .catch((err) => console.error("Migration failed", err))
  .finally(() => connection.end());
