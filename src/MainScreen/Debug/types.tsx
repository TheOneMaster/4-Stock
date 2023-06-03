import { convertSets, reduceSets } from "./Main";

export type BracketRounds = ReturnType<typeof reduceSets>;
export type FullBracket = ReturnType<typeof convertSets>;
export type BracketData = {
    rounds: number[]
    maxRound: number
    roundOffset: number
    maxLength: number
}
export type FullBracketData = {
    winners: BracketData
    losers: BracketData
    total: {
        length: number
        roundOffset: number
    }
}

export type Position = {
    x: number
    y: number
}
