import { useRef } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { GameSet, Standing } from "../../types";
import { useTheme } from "@react-navigation/native";

interface SetResultProps {
    set: GameSet
    style?: StyleProp<ViewStyle>
}



function getWinner(set: GameSet): Standing {
    return set.slots.reduce<Standing>((prev, cur) => {
        if (cur.standing.placement === 1) {
            return cur.standing
        }
        return prev
    }, null)
}

function getLosers(set: GameSet): Standing[] {
    return set.slots.reduce<Standing[]>((prev, cur) => {
        if (cur.standing.placement !== 1) {
            prev.push(cur.standing)
        }
        return prev
    }, [])
}


function SetResult(props: SetResultProps) {
    const winner = useRef(getWinner(props.set));
    const losers = useRef(getLosers(props.set));

    const { colors } = useTheme();
    const colorCSS = StyleSheet.create({
        container: {
            borderColor: colors.border,
            backgroundColor: colors.card
        }
    })


    return (
        <View style={[styles.container, colorCSS.container, props.style]}>
            <EntrantRow name={winner.current.entrant.name} score={winner.current.stats.score.value} winner style={{ borderTopWidth: 0 }} />
            <EntrantRow name={losers.current[0].entrant.name} score={losers.current[0].stats.score.value} />
        </View>
    )




}

interface EntrantRowProps {
    name: string
    score: number
    winner?: boolean
    style?: StyleProp<ViewStyle>
}

function EntrantRow(props: EntrantRowProps) {

    const { colors } = useTheme()

    const colorCSS = StyleSheet.create({
        entrantRow: {
            borderColor: colors.border
        },
        entrantRowScoreBox: {
            borderColor: colors.border,
            backgroundColor: props.winner ? "green" : "red"
        },
        text: {
            color: colors.text
        }
    })


    return (
        <View style={[styles.entrantRow, colorCSS.entrantRow, props.style]}>
            <Text style={[styles.entrantRowName, colorCSS.text]}>{props.name}</Text>
            <View style={[styles.entrantRowScoreBox, colorCSS.entrantRowScoreBox]}>
                <Text style={styles.entrantRowScore}>{props.score === -1 ? "DQ" : props.score.toString()}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderWidth: 2,
        marginBottom: 10
    },
    entrantRow: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderStyle: 'solid',
    },
    entrantRowName: {
        flexGrow: 1,
        color: 'white',
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
