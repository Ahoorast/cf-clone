ALTER TABLE "problem" ADD CONSTRAINT "problem_url_unique" UNIQUE("url");--> statement-breakpoint
ALTER TABLE "submission" ADD CONSTRAINT "submission_url_unique" UNIQUE("url");