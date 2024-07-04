import { relations } from "drizzle-orm";
import { serial, text, timestamp, pgTable, varchar, integer } from "drizzle-orm/pg-core";
// import { z } from "zod";
// import { createSelectSchema, createInsertSchema } from "drizzle-zod";
// export const ProblemInsertSchema = createInsertSchema(problem);
// export const ProblemSelectSchema = createSelectSchema(problem);
//

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
    lowerSolution: text("lowercase_solution"),
    status: varchar("status").$type<SubmissionStatus>(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    problemId: integer("problem_id").references(() => problem.id).notNull(),
});

export const note = pgTable("note", {
    id: serial("id").primaryKey().notNull(),
    content: text("content"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const problemNote = pgTable("problem_note", {
    id: serial("id").primaryKey().notNull(),
    problemId: integer("problem_id"),
    noteId: integer("note_id"),
});

export const problemNoteRelations = relations(problemNote, ({ one }) => ({
    problem: one(problem, {
        fields: [problemNote.problemId],
        references: [problem.id],
    }),
}));

export const problemRelations = relations(problem, ({ many }) => ({
    notes: many(problemNote),
    submissions: many(submission),
}));

export const submissionRelations = relations(submission, ({ one }) => ({
    problem: one(problem, {
        fields: [submission.problemId],
        references: [problem.id],
    }),
}));
