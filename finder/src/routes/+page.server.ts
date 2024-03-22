// import type { PageServerLoadEvent } from './$types';
import { db } from '$pgclient';
import { problem, submission } from '$schema';
import { eq } from 'drizzle-orm';
// import { fail, type RequestHandler } from '@sveltejs/kit';
// import { z } from "zod";
import type { Actions } from './$types';
 

export async function load(/* event: PageServerLoadEvent */) {
	return {
		problems: await db.select().from(problem).leftJoin(submission, eq(problem.id, submission.problemId)),
	};
}

// export const actions = {
// 	// get_statement: async ({ cookies, request }) => {
// 	// 	console.log("HI");
// 	// 	const body = await request.json();
// 	// 	const id = body.id;
// 	// 	console.log(id);
// 	// 	return await db.select({
// 	// 		statement: problem.statement,
// 	// 	}).from(problem).where(eq(problem.id, id));
// 	// },
// 	// get_solution: async ({ cookies, request }) => {
// 	// 	return await db.select({
// 	// 		solution: submission.solution,
// 	// 	}).from(submission).where(eq(submission.problemId, id));
// 	// },
// 	search: async ({ cookies, request }) => {
// 		const data = await request.formData();
// 		console.log("THIS IS", data);
// 		// data.forEach((value, key) => {
// 		// 	console.log(key, value);
// 		// );
// 		return { 
// 			success: true,
// 			wtf: 'ye baby',
// 		};
// 	}
// } satisfies Actions;
