import { BracketData, BracketRounds, FullBracket, FullBracketData, SetList } from "./types";


export function reduceSets(sets: SetList) {
    return sets.map(set => {
        return {
            id: set?.id,
            round: set?.round,
            slots: set?.slots ?? []
        }
    }) ?? [];
}

export function convertSets(sets: SetList) {
    const setMap = reduceSets(sets);

    const maxRound = Math.max(...setMap.map(set => set.round ?? -1));
    const minRound = Math.min(...setMap.map(set => set.round ?? 1));

    const winnersBracket: BracketRounds = {}
    for (let i=0;i<=maxRound;i++) {
        const setsInRound = setMap.filter(set => set.round === i);
        if (setsInRound.length > 0) {
            winnersBracket[i] = setsInRound;
        }
    }

    const losersBracket: BracketRounds = {};
    for (let i=-1;i>minRound;i--) {
        const setsInRound = setMap.filter(set => set.round === i);
        if (setsInRound.length > 0) {
            losersBracket[i] = setsInRound;
        }
    }

    return {
        winners: winnersBracket,
        losers: losersBracket
    }

}

function bracketAnalysis(bracket: BracketRounds): BracketData {
    const rounds = Object.keys(bracket).map((round) => parseInt(round)).sort((a, b) => Math.abs(a) - Math.abs(b));
    const absRounds = rounds.map((round) => Math.abs(round));

    const maxRound = Math.max(...absRounds);
    const roundOffset = Math.min(...absRounds);
    // const roundOffset = maxRound - minRound;

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
