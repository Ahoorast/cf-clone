import type { RequestHandler } from './$types';
import { db } from '$pgclient';
import { problem, submission } from '$schema';
import { eq, and, lte, like, or, not } from 'drizzle-orm';
import { DOMParser, Window } from 'happy-dom';
import { lex, initLexer, Token } from '$lib/lexer/lexer';
import type { Tokenized } from '$lib/lexer/lexer';
import { PgColumn } from 'drizzle-orm/pg-core';

function tokenToCondition(token: Token) {
    if (token === Token.NOT) {
	return not;
    }
    if (token === Token.AND) {
	return and;
    }
    if (token === Token.OR) {
	return or;
    }
    return undefined;
}


function buildQuery(tokens: Tokenized[], solution: PgColumn) {
    if (tokens.length === 1) {
	return like(solution, `%${tokens[0].value}%`);
    }
    if (tokens[0].token === Token.LPAREN) {
	const matchToken = tokens.find((token) => token.token === Token.RPAREN)
	if (matchToken === undefined) {
	    return undefined;
	}
	const matchIndex = tokens.indexOf(matchToken);
	const insideQuery = buildQuery(tokens.slice(1, matchIndex), solution);
	const condition = tokenToCondition(tokens[matchIndex + 1])
	return 
    }
}

export const POST: RequestHandler = async (req) => { 
    const data = await req.request.json();
    const lexer = initLexer(data.query);
    const tokens = lex(lexer).tokens;
    if (tokens.find((value) => value.token === Token.INVALID) !== undefined) {
	console.log("HII");
    }
    const query = buildQuery(tokens, submission.lowerSolution);
    console.log(tokens);
    const response = new Response(
	JSON.stringify({
	    problems: await db.select().from(problem).leftJoin(submission, eq(problem.id, submission.problemId)).where(query),
	})
    );
    return response;
};
