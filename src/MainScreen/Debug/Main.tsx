import { StyleSheet } from "react-native";
import { DebugPageProps } from "../../navTypes";

import { PlayerData, TwoPlayerMatch } from "../../SVGLibrary/commonComponents";


export function DebugPage(props: DebugPageProps) {
    // const sets = convertSets(SetData);

    const player1: PlayerData = {
        tag: "test1",
        score: 3
    }
    const player2 = {
        tag: "player2",
        score: 2
    }

    return (
        <>
            {/* <DoubleElimBracket bracket={sets} /> */}
            <TwoPlayerMatch player1={player1} player2={player2} />
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
