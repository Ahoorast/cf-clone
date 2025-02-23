import { db } from '$pgclient';
import { tag, problemTag } from '$schema';
import { eq } from 'drizzle-orm';
import { DOMParser, Window } from 'happy-dom';

export const createTag = async (name: string) => {
    const tagExists = await db.select().from(tag).where(eq(tag.name, name));
    if (tagExists.length > 0) {
        return tagExists[0];
    }
    let result = await db.insert(tag).values({ name }).returning();
    return result[0];
}

export const addTagsToProblem = async (problemId: number, tags: string[]) => {
    for (const tag of tags) {
        const tagRow = await createTag(tag);
        try {
            await db.insert(problemTag).values({
                problemId: problemId,
                tagId: tagRow.id
            })
        } catch (e) {
        }
    }
};

export const getTagsFromStatement = (htmlStatement: string) => {
    const w = new Window();
    const parser = new DOMParser(w);
    const documentStatemnet = parser.parseFromString(htmlStatement, 'text/html');
    const tags = documentStatemnet.getElementsByClassName('tag-box').map((tag) => tag.textContent.trim());
    return tags;
};
