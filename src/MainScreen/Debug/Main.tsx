import { StyleSheet, View } from "react-native";
import { DebugPageProps } from "../../navTypes";

import { SetQuery } from "../../Event/Bracket/types";
import { GameBracket } from "./Bracket";
import SetData from "./Sets.json";

export type BracketRounds = {
    [round: number]: ReturnType<typeof reduceSets>
}

export function reduceSets(sets: SetQuery) {
    return sets.phaseGroup.sets?.nodes.map(set => {
        return {
            id: set?.id,
            round: set?.round,
            slots: set?.slots ?? []
        }
    }) ?? [];
}

export function convertSets(sets: SetQuery) {
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


export function DebugPage(props: DebugPageProps) {
    const sets = convertSets(SetData);

    return (
        <>
            {/* <GameBracket title="Winners" bracket={sets.winners} /> */}
            {/* <GameBracket title="Losers" bracket={sets.losers} /> */}
            <GameBracket bracket={sets} />
        </>
    )
}

const styles = StyleSheet.create({
    mainPage: {
        flex: 1,
        // backgroundColor: "blue"
    },
    seperator: {
        width: "100%",
        height: 10,
        backgroundColor: "grey"
    }
})
