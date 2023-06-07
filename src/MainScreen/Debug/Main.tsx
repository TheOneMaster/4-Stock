import { StyleSheet } from "react-native";
import { DebugPageProps } from "../../navTypes";

import { DoubleElimBracket } from "./Bracket";
import SetData from "./Sets.json";
import { convertSets } from "./BracketData";


export function DebugPage(props: DebugPageProps) {
    const sets = convertSets(SetData);

    return (
        <>
            <DoubleElimBracket bracket={sets} />
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
