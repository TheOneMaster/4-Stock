import { StyleSheet, Text, View } from "react-native"
import { TransparentCard } from "../../Shared"
import { CustomText } from "../../Shared/Text"
import { reduceSets } from "./Main"


interface GameMatchProps {
    match: ReturnType<typeof reduceSets>[number]
    x: number
    y: number
}

const offsetXMultiplier = 1;
const offsetYMultiplier = 1;

export function GameMatch(props: GameMatchProps) {

    const matchID = props.match;
    // console.log(props.match)

    const winnerSlot = props.match.slots?.find(slot => slot?.standing?.placement === 1);
    const loserSlot = props.match.slots?.find(slot => slot?.standing?.placement !== 1);

    const offsetX = props.x * offsetXMultiplier;
    const offsetY = props.y * offsetYMultiplier;

    const offsets = {
        // top: offsetY,
        top: 0,
        // left: offsetX
        left: 0
    }

    return (
        <TransparentCard style={[styles.container, offsets]}>

            <View style={styles.entrantRow}>
                <CustomText style={styles.entrantText} numberOfLines={1}>{winnerSlot?.standing?.entrant?.name}</CustomText>
                <View style={{backgroundColor: "green"}}>
                    <Text style={styles.scoreText}>{winnerSlot?.standing?.stats?.score?.value}</Text>
                </View>
            </View>

            <View style={{backgroundColor: "grey", height: 1}} />

            <View style={styles.entrantRow}>
                <CustomText style={styles.entrantText} numberOfLines={1}>{loserSlot?.standing?.entrant?.name}</CustomText>
                <View style={{backgroundColor: "red"}}>
                    <Text style={styles.scoreText}>{loserSlot?.standing?.stats?.score?.value}</Text>
                </View>
            </View>

        </TransparentCard>

    )
}

const styles = StyleSheet.create({
    container: {
        // position: "absolute",
        borderWidth: 1,
        // left: 10,
        width: 150,
        // maxWidth: 150,
        // minWidth: 150
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
