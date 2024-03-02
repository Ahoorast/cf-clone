import { db } from "$pgclient";
import { problem, submission } from "$schema";
import { eq } from "drizzle-orm";
import fs from "fs";

const BASE_DIR = "../cloner/Ahoora";

const readDir = (dir: string) => {
	return fs.readdirSync(dir);
};

const readFile = (dir: string) => {
	return fs.readFileSync(dir).toString();
};

const problemFiles = readDir(BASE_DIR);

for (const file of problemFiles) {
	const solution = readFile(`${BASE_DIR}/${file}`);
	const url = `codeforces.com${file.replaceAll("_", "/").replaceAll("-", "/")}`;
	const problems = await db.select({id: problem.id}).from(problem).where(eq(problem.url, url));
	let p: any = problems[0];
	if (p === undefined) {
		p = await db.insert(problem).values({
			url: url,
		}).returning({id: problem.id})[0];
	} 
	await db.insert(submission).values({
		solution: solution,
		status: "ac",
		problemId: p.id,
	});
}

console.log("HI");
