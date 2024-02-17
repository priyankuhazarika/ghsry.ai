import { datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { customAlphabet } from "nanoid";

const generateId = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  22,
);

export const users = mysqlTable("users", {
  id: varchar("id", { length: 35 })
    .primaryKey()
    .$default(() => `user_${generateId()}`),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: datetime("createdAt", { mode: "date" }).$default(() => new Date()),
});

// export type User = typeof users.$inferSelect;
