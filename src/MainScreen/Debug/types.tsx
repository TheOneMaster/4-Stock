import { GetPhaseGroupSetsQuery } from "../../gql/gql";
import { NodeArray, PropertyDetails } from "../../helperTypes";
import { convertSets } from "./BracketData";


export type BracketRounds = {
    [round: number]: SetList
}

export type SetList = NodeArray<PropertyDetails<GetPhaseGroupSetsQuery, 'phaseGroup'>['sets']>
export type Match = Exclude<SetList[number], null>;
export type MatchSlot = PropertyDetails<Match, "slots">[number]



export type FullBracket = ReturnType<typeof convertSets>;
export type RoundSets = SetList;
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

export type PlayerSlot = PropertyDetails<Match, "slots"> | undefined
