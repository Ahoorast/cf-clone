import { DOMParser, Window } from 'happy-dom';


export const getTagsFromStatement = (htmlStatement: string) => {
    const w = new Window();
    const parser = new DOMParser(w);
    const documentStatemnet = parser.parseFromString(htmlStatement, 'text/html');
    const tags = documentStatemnet.getElementsByClassName('tag-box').map((tag) => tag.textContent.trim());
    return tags;
};

export const fetchStatement = async (url: string) => {
    const cfResponse = await fetch(`https://${url}`)
    const cfText = await cfResponse.text();
    const w = new Window();
    const parser = new DOMParser(w);
    const documentStatemnet = parser.parseFromString(cfText, 'text/html');
    const pageContent = documentStatemnet.getElementById('pageContent').parentElement;
    const htmlStatement = pageContent?.innerHTML;
    return htmlStatement;
};
