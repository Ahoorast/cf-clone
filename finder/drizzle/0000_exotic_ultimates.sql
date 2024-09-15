CREATE TABLE IF NOT EXISTS "note" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "problem" (
	"id" serial PRIMARY KEY NOT NULL,
	"statement" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"url" varchar(100),
	CONSTRAINT "problem_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "problem_note" (
	"id" serial PRIMARY KEY NOT NULL,
	"problem_id" integer,
	"note_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submission" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(100),
	"solution" text,
	"lowercase_solution" text,
	"status" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"problem_id" integer NOT NULL,
	CONSTRAINT "submission_url_unique" UNIQUE("url")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "submission_problem_id_problem_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problem"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
