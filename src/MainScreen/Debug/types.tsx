import { SetQuery } from "../../Event/Bracket/types";
import { NodeArray, PropertyDetails } from "../../helperTypes";
import { convertSets, reduceSets } from "./BracketData";


export type BracketRounds = {
    [round: number]: ReturnType<typeof reduceSets>
}

export type SetList = NodeArray<PropertyDetails<SetQuery['phaseGroup'], "sets">>

export type FullBracket = ReturnType<typeof convertSets>;
export type RoundSets = ReturnType<typeof reduceSets>;
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

export type Match = ReturnType<typeof reduceSets>[number]
export type PlayerSlot = PropertyDetails<Match, "slots">[number] | undefined
