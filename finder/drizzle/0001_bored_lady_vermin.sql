ALTER TABLE "problem" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "problem" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "problem" ALTER COLUMN "created_at" SET NOT NULL;