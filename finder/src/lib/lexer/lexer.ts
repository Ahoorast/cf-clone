// wanted to do this with immutability life has never been more painfull
export enum Token {
    AND,
    OR,
    NOT,
    LPAREN,
    RPAREN,
    KEYWORD,
    INVALID,
}

export type Tokenized = {
    token: Token,
    value: string,
};

type LexerState = {
    input: string,
    tokens: Tokenized[],
    readPos: number,
};

function nextChar(lexerState: LexerState) {
    return {
        input: lexerState.input,
        tokens: lexerState.tokens,
        readPos: lexerState.readPos + 1,
    };
};

function firstChar(lexerState: LexerState) {
    return lexerState.input[lexerState.readPos];
}

function isWhitespace(input: string): boolean {
    const whitespace = [' ', '\n', '\t'];
    return whitespace.includes(input);
}

function readString(lexerState: LexerState): LexerState {
    if (hasEnded(lexerState)) {
        return {
            input: lexerState.input,
            readPos: lexerState.readPos,
            tokens: [...lexerState.tokens, {
                token: Token.INVALID,
                value: "",
            }]
        }
    }
    const c = firstChar(lexerState);
    if (c === '"') {
        const firstToken: Tokenized = {
            token: Token.KEYWORD,
            value: "",
        }
        const retLexer = lex(nextChar(lexerState));
        return {
            input: retLexer.input,
            tokens: [firstToken, ...retLexer.tokens],
            readPos: retLexer.readPos + 1,
        };
    }
    const retLexer = readString(nextChar(lexerState));
    const firstToken = retLexer.tokens[0];
    firstToken.value = c + firstToken.value;
    return {
        input: retLexer.input,
        tokens: [firstToken, ...retLexer.tokens.slice(1)],
        readPos: retLexer.readPos,
    };
}

function hasEnded(lexerState: LexerState): boolean {
    if (lexerState.readPos >= lexerState.input.length) {
        return true;
    }
    return false;
}

function getToken(c: string) {
    if (c == '(') {
        return Token.LPAREN;
    }
    if (c == ')') {
        return Token.RPAREN;
    }
    if (c == '&') {
        return Token.AND;
    }
    if (c == '|') {
        return Token.OR;
    }
    if (c == '!') {
        return Token.NOT;
    }
    return Token.INVALID;
}

export function lex(lexerState: LexerState): LexerState {
    if (hasEnded(lexerState)) {
        return lexerState;
    }
    const c = firstChar(lexerState);
    if (isWhitespace(c)) {
        return lex(nextChar(lexerState));
    }
    if (c == '"') {
        return readString(nextChar(lexerState));
    }
    const thisToken: Tokenized = { 
        token: getToken(c),
        value: c,
    };
    const retLexer = lex(nextChar(lexerState));
    return {
        input: retLexer.input,
        tokens: [thisToken, ...retLexer.tokens],
        readPos: retLexer.readPos,
    }
}

export function initLexer(input: string): LexerState {
    return {
        input: input,
        tokens: [],
        readPos: 0,
    }
}
