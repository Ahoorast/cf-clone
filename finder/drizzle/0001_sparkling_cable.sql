CREATE TABLE IF NOT EXISTS "problem_tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"problem_id" integer,
	"tag_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	CONSTRAINT "tag_name_unique" UNIQUE("name")
);
