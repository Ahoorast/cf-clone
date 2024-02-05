import { $ } from "bun";

let keywords: string[] = ["DSU", "findRoot", "get_par"];

let ls: string = await $`ls Ahoora`.text();
let files: string[] = ls.split('\n');

for (let file of files) {
    let text: string = await $`cat Ahoora/${file}`.text();
    if (keywords.some(kw => text.includes(kw))) {
        console.log(`codeforces.com${file.replaceAll('_', '/')}`);
    }
}
