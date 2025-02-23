import { fetchStatement, getTagsFromStatement } from "$lib/db/uitls/codeforces";
import { addTagsToProblem } from "$lib/db/uitls/problems";
import { db } from "$pgclient";
import { problem as problems, tag, problemTag } from "$schema";
import { eq } from "drizzle-orm";

const allProblems = await db.select().from(problems);

for (const problem of allProblems) {
	console.log("fetching statement for problem", problem.id);
	const htmlStatement = await fetchStatement(problem.url!);
	console.log(htmlStatement)
	const problemTags = getTagsFromStatement(htmlStatement!);
	await db.update(problems).set({ statement: htmlStatement }).where(eq(problems.id, problem.id)).returning();
	await addTagsToProblem(problem.id, problemTags);
	console.log("fetching statement for problem", problem.id, "done");
}
