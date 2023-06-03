import { BracketRounds } from "./Main";
import { convertSets } from "./Main"
import { BracketData, FullBracket, FullBracketData } from "./types";




function bracketAnalysis(bracket: BracketRounds): BracketData {
    const rounds = Object.keys(bracket).map((round) => parseInt(round)).sort((a, b) => Math.abs(a) - Math.abs(b));
    const absRounds = rounds.map((round) => Math.abs(round));

    const maxRound = Math.max(...absRounds);
    const roundOffset = Math.min(...absRounds);

    const maxLength = Math.max(...rounds.map((round) => bracket[round].length));

    return {rounds, maxRound, roundOffset, maxLength}
}


export function getBracketData(bracket: FullBracket): FullBracketData {

    const {winners, losers} = bracket;

    const winnersAnalysis = bracketAnalysis(winners);
    const losersAnalysis = bracketAnalysis(losers);

    const maxRounds = Math.max(winnersAnalysis.rounds.length, losersAnalysis.rounds.length);
    const roundOffset = Math.min(winnersAnalysis.roundOffset, losersAnalysis.roundOffset);


    return {
        winners: bracketAnalysis(winners),
        losers: bracketAnalysis(losers),
        total: {
            length: maxRounds,
            roundOffset: roundOffset
        }
    }
}
