import { StyleSheet, View } from "react-native";
import { DebugPageProps } from "../../navTypes";
import { BracketTree } from "./BracketTree";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";

import SetData from "./Sets.json"
import { SetQuery } from "../../Event/Bracket/types";

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

    console.log(maxRound);
    const winnersBracket: BracketRounds = {}
    for (let i=0;i<=maxRound;i++) {
        const setsInRound = setMap.filter(set => set.round === i);
        winnersBracket[i] = setsInRound;
    }

    const losersBracket: BracketRounds = {};
    for (let i=-1;i>minRound;i--) {
        const setsInRound = setMap.filter(set => set.round === i);
        losersBracket[i] = setsInRound;
    }

    return {
        winners: winnersBracket,
        losers: losersBracket
    }

}


export function DebugPage(props: DebugPageProps) {

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const context = useSharedValue({x: 0, y: 0});

    const clampedTranslateX = useDerivedValue(() => {
        return Math.min(translateX.value, 0);
    });
    const clampedTranslateY = useDerivedValue(() => {
        return Math.min(translateY.value, 0);
    })

    const panGesture = Gesture.Pan().onStart(event => {
        context.value = {y: clampedTranslateY.value, x: clampedTranslateX.value};
    }).onUpdate(event => {
        translateX.value = event.translationX + context.value.x;
        translateY.value = event.translationY + context.value.y;

        // console.log(translateX.value)

    }).onEnd(event => {

    });

    const sets = convertSets(SetData);
    console.log(sets.winners)
    

    return (
        <GestureDetector gesture={panGesture}>
            <View style={styles.mainPage}>
                <BracketTree translateX={clampedTranslateX} translateY={clampedTranslateY} bracket={sets.winners} />
            </View>
        </GestureDetector>

    )
}

const styles = StyleSheet.create({
    mainPage: {
        flex: 1,
        // backgroundColor: "blue"
    }
})
