import { StyleSheet, Text } from "react-native";

import { truthyFilter } from "../../helper";
import { PrimaryCard, TransparentCard } from "../../Shared";
import { CustomText } from "../../Shared/Text";
import { EntrantRowProps, Set, SetResultProps } from "./types";

function getWinner(set: Set) {
    return set.slots
        .map(slot => slot?.standing)
        .find(standing => standing?.placement === 1) ?? null;
}

function getLosers(set: Set) {
    return set.slots
        .map(slot => slot?.standing)
        .filter(standing => standing?.placement !== 1)
        .filter(truthyFilter);
}

function SetResult(props: SetResultProps) {
    const winner = getWinner(props.set);
    const losers = getLosers(props.set);

    if (winner === null || losers.length === 0) return null

    return (
        <PrimaryCard style={[styles.container, props.style]}>
            <EntrantRow name={winner.entrant?.name} score={winner.stats?.score?.value ?? null} winner style={{ borderTopWidth: 0 }} />
            <EntrantRow name={losers[0].entrant?.name} score={losers[0].stats?.score?.value ?? null} />
        </PrimaryCard>
    )
}



function EntrantRow(props: EntrantRowProps) {

    const {
        score,
        winner = false,
        style
    } = props;
    const name = props.name || "N/A";

    return (
        <TransparentCard style={[styles.entrantRow, style]}>
            <CustomText style={styles.entrantRowName}>{name}</CustomText>
            <TransparentCard style={[styles.entrantRowScoreBox, { backgroundColor: props.winner ? "green" : "red" }]}>
                {score === null
                    ? <Text style={styles.entrantRowScore}>{winner ? "W" : "L"}</Text>
                    : <Text style={styles.entrantRowScore}>{score === -1 ? "DQ" : score.toString()}</Text>
                }
            </TransparentCard>
        </TransparentCard>
    )
}


const styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderWidth: 2,
    },
    entrantRow: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderStyle: 'solid',
    },
    entrantRowName: {
        flexGrow: 1,
        padding: 5
    },
    entrantRowScore: {
        color: 'white',
        fontWeight: '500'
    },
    entrantRowScoreBox: {
        width: 30,
        justifyContent: 'center',
        alignItems: "center",
        borderLeftWidth: 2,
        borderStyle: "solid"
    }
})

export default SetResult
