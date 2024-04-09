CREATE TABLE IF NOT EXISTS "note" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "problem_note" (
	"id" serial PRIMARY KEY NOT NULL,
	"problem_id" integer,
	"note_id" integer
);
