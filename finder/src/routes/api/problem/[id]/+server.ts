import type { RequestHandler } from './$types';
import { db } from '$pgclient';
import { problem as problems, submission } from '$schema';
import { eq } from 'drizzle-orm';
import { DOMParser, Window } from 'happy-dom';


export const GET: RequestHandler = async (req) => { 
    const id = parseInt(req.params.id);
    const problem = await db.select().from(problems).where(eq(problems.id, id));
    const cfResponse = await fetch(`https://${problem[0].url}`)
    const cfText = await cfResponse.text();
    const w = new Window();
    const parser = new DOMParser(w);
    const documentStatemnet = parser.parseFromString(cfText, 'text/html');
    const pageContent = documentStatemnet.getElementById('pageContent').parentElement;
    const htmlStatement = pageContent?.innerHTML;
    const newProblem = await db.update(problems).set({ statement: htmlStatement }).where(eq(problems.id, id)).returning();
    const response = new Response(JSON.stringify({
        problem: newProblem,
    }));
    return response;
};
