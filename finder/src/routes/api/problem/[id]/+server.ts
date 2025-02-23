import type { RequestHandler } from './$types';
import { db } from '$pgclient';
import { problem as problems, submission, tag, problemTag } from '$schema';
import { eq } from 'drizzle-orm';
import { addTagsToProblem } from '$lib/db/uitls/problems';
import { fetchStatement, getTagsFromStatement } from '$lib/db/uitls/codeforces';

export const GET: RequestHandler = async (req) => { 
    const id = parseInt(req.params.id);
    const problem = await db.select().from(problems).where(eq(problems.id, id));
    const htmlStatement = await fetchStatement(problem[0].url!);
    const problemTags = getTagsFromStatement(htmlStatement!);
    const newProblem = await db.update(problems).set({ statement: htmlStatement }).where(eq(problems.id, id)).returning();
    await addTagsToProblem(newProblem[0].id, problemTags);
    const response = new Response(JSON.stringify({
        problem: newProblem,
    }));
    return response;
};
