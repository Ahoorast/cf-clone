import { problem } from "$schema";
import { db } from "$pgclient";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const problems = await db.query.problem.findMany({});
    return {
        sth: process.env.VITE_DATABASE_URL,
        problems: problems,
    };
}
