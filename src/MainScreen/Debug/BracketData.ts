import { BracketData, BracketRounds, FullBracket, FullBracketData, SetList } from "./types";

export function convertSets(sets: SetList) {
    const setMap = sets ?? []

    const maxRound = Math.max(...setMap.map(set => set?.round ?? -1));
    const minRound = Math.min(...setMap.map(set => set?.round ?? 1));

    const winnersBracket = getSetsInRounds(0, maxRound, setMap);
    const losersBracket = getSetsInRounds(-1, minRound, setMap);

    return {
        winners: winnersBracket,
        losers: losersBracket
    }

}

function getSetsInRounds(startRound: number, endRound: number, setList: SetList) {

    const iterDirection = endRound - startRound >= 0 ? 1 : -1;
    const startIter = Math.abs(startRound);
    const endIter = Math.abs(endRound);

    const bracketRounds: BracketRounds = {}

    for (let i=startIter; i <= endIter; i++) {
        const actualRound = iterDirection * i;
        const setsInRound = setList.filter(set => set?.round === actualRound)
            .sort((a, b) => a?.identifier?.localeCompare(b?.identifier ?? "XX") ?? -1);

        if (setsInRound.length > 0) {
            bracketRounds[actualRound] = setsInRound;
        }
    }

    return bracketRounds;
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
