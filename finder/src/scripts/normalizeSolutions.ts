import { db } from "$pgclient";
import { problem, submission } from "$schema";
import { eq, like, sql } from "drizzle-orm";


console.log("HI");

await db.update(submission).set({
	lowerSolution: (() => {
		const x = sql`solution`;
		console.log(x);
		return sql`replace(lower(${submission.solution}), ' ', '')`;
	})(),
});

console.log("HI");

