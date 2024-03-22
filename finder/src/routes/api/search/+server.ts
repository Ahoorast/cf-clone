import type { RequestHandler } from './$types';
import { db } from '$pgclient';
import { problem, submission } from '$schema';
import { eq, and, like, or, not, SQL } from 'drizzle-orm';
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


// TODO: not finished yet
function buildQuery(tokens: Tokenized[], solution: PgColumn) {
    const hasAndOr = tokens.find((val) => { 
	return (val.token === Token.AND || val.token === Token.OR);
    });
    if (hasAndOr === undefined) {
	if (tokens.length === 1) {
	    if (tokens[0].token !== Token.KEYWORD) {
		return undefined;
	    }
	    return like(solution, `%${tokens[0].value}%`);
	}
	if (tokens[0].token === Token.NOT) {
	    return not(buildQuery(tokens.slice(1), solution));
	}
	return buildQuery(tokens.slice(1), solution);
    }

}

function buildQuerySimple(keywordTokens: Tokenized[], solution: PgColumn): SQL<unknown> | undefined {
    const firstQuery = like(solution, `%${keywordTokens[0].value}%`);
    if (keywordTokens.length === 1) {
	return firstQuery;
    }
    return or(firstQuery, buildQuerySimple(keywordTokens.slice(1), solution));
}

function transformToLowercase(tokens: Tokenized[]) {
    return tokens.map((tok) => {
	if (tok.token !== Token.KEYWORD) {
	    return tok;
	}
	return {
	    token: tok.token,
	    value: tok.value.toLowerCase().split(' ').join(''),
	};
    });
}

export const POST: RequestHandler = async (req) => { 
    const data = await req.request.json();
    const lexer = initLexer(data.query);
    const tokens = transformToLowercase(lex(lexer).tokens);
    //    if (tokens.find((value) => value.token === Token.INVALID) !== undefined) {
    // console.log("HII");
    //    }
    const keywordTokens = tokens.filter((tok) => {
	return tok.token === Token.KEYWORD;
    })
    console.log(keywordTokens);
    const query = buildQuerySimple(keywordTokens, submission.lowerSolution);
    const response = new Response(
	JSON.stringify({
	    problems: await db.select().from(problem).leftJoin(submission, eq(problem.id, submission.problemId)).where(query),
	})
    );
    return response;
};
