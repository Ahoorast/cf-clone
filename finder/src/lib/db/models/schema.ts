import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const problem = pgTable("problem", {
    id: serial("id").primaryKey(),
    statement: text("statement"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

