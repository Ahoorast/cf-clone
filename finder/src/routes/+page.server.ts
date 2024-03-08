// import type { PageServerLoadEvent } from './$types';
import { db } from '$pgclient';
import { problem } from '$schema';

export async function load(/* event: PageServerLoadEvent */) {
	return {
		problems: await db.select().from(problem),
	};
}
