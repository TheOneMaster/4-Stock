import { useRef } from "react"
import { TransparentCard } from "../Shared"
import { StyleSheet, Text, View } from "react-native"
import { CustomText } from "../Shared/Text"

export interface PlayerData {
    tag: string
    sponsor?: string
    score?: number
}

interface TwoPlayerMatchProps {
    player1: PlayerData
    player2: PlayerData
}

interface PlayerRowProps {
    player: PlayerData
}


export function TwoPlayerMatch(props: TwoPlayerMatchProps) {

    const ref = useRef(null);

    const player1Name = props.player1.tag;
    const player2Name = props.player2.tag;


    return (
        <TransparentCard style={styles.container} >
            <PlayerRow player={props.player1} />
        </TransparentCard>
    )
}

function PlayerRow(props: PlayerRowProps) {
    return (
        <TransparentCard style={styles.row}>

            <View style={styles.row}>

                <View>
                    <CustomText>{props.player.sponsor}</CustomText>
                </View>
                <View>
                    <CustomText>{props.player.tag}</CustomText>
                </View>
            </View>

            <View>
                <CustomText>{props.player.score?.toString()}</CustomText>
            </View>

        </TransparentCard>
    )
}


const styles = StyleSheet.create({
    container: {

    },
    row: {
        flexDirection: "row"
    }
})
