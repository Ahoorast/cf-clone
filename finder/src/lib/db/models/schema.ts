import { serial, text, timestamp, pgTable, varchar, integer } from "drizzle-orm/pg-core";

export const problem = pgTable("problem", {
    id: serial("id").primaryKey().notNull(),
    statement: text("statement"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    url: varchar("url", { length: 100 }).unique(),
});

type SubmissionStatus = "ac" | "tle" | "rte" | "wa" | "ce";

export const submission = pgTable("submission", {
    id: serial("id").primaryKey().notNull(),
    url: varchar("url", { length: 100 }).unique(),
    solution: text("solution"),
    status: varchar("status").$type<SubmissionStatus>(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    problemId: integer("problem_id").references(() => problem.id).notNull(),
});
