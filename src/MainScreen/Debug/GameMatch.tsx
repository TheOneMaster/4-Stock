import { StyleSheet, Text, View } from "react-native"
import { TransparentCard } from "../../Shared"
import { CustomText } from "../../Shared/Text"
import { reduceSets } from "./Main"


interface GameMatchProps {
    match: ReturnType<typeof reduceSets>[number]
    offsetX: number
    offsetY: number
}

export function GameMatch(props: GameMatchProps) {

    const matchID = props.match;
    // console.log(props.match)
    console.log(`X: ${props.offsetX}, Y: ${props.offsetY}`)

    const winnerSlot = props.match.slots?.find(slot => slot?.standing?.placement === 1);
    const loserSlot = props.match.slots?.find(slot => slot?.standing?.placement !== 1);

    return (
        <TransparentCard style={[styles.container, {top: props.offsetY, left: props.offsetX}]}>

            <View style={styles.entrantRow}>
                <CustomText style={styles.entrantText} numberOfLines={1}>{winnerSlot?.standing?.entrant?.name}</CustomText>
                <View style={{backgroundColor: "green"}}>
                    <Text style={styles.scoreText}>3</Text>
                </View>
            </View>

            <View style={{backgroundColor: "grey", height: 1}} />

            <View style={styles.entrantRow}>
                <CustomText style={styles.entrantText} numberOfLines={1}>{loserSlot?.standing?.entrant?.name}</CustomText>
                <View style={{backgroundColor: "red"}}>
                    <Text style={styles.scoreText}>2</Text>
                </View>
            </View>

        </TransparentCard>

    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        borderWidth: 1,
        // left: 10,
        width: 150
    },
    entrantRow: {
        flexDirection: "row",
    },
    scoreText: {
        color: "white",
        paddingHorizontal: 5,
    },
    entrantText: {
        flexGrow: 1,
        paddingHorizontal: 5
    }

})
