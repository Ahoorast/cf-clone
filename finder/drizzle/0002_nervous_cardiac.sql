CREATE TABLE IF NOT EXISTS "submission" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(50),
	"solution" text,
	"status" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"problem_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "problem" ADD COLUMN "url" varchar(50);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "submission_problem_id_problem_id_fk" FOREIGN KEY ("problem_id") REFERENCES "problem"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
