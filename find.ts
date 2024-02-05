import { $ } from "bun";

const LOG_SOLUTION = true;

let keywords: string[] = ["undo"];

let ls: string = await $`ls Ahoora`.text();
let files: string[] = ls.split('\n');

function normalize(s: string): string {
    return s.toLowerCase().replace(/\s+/g, '');
}

for (let file of files) {
    let solution: string = await $`cat Ahoora/${file}`.text();
    let text = normalize(solution);
    if (keywords.some(kw => text.includes(normalize(kw)))) {
        console.log(`codeforces.com${file.replaceAll('_', '/')}`);
        if (LOG_SOLUTION) {
            console.log(solution);
        }
    }
}
