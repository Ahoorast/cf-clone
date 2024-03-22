import { db } from '$pgclient';
import { problem, submission } from '$schema';
import { eq } from 'drizzle-orm';
 

export async function load(/* event: PageServerLoadEvent */) {
	return {
		problems: await db.select().from(problem).leftJoin(submission, eq(problem.id, submission.problemId)),
	};
}
