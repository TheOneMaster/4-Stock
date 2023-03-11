import { FlatList, StyleSheet, View } from "react-native";
import { BracketPhasesProps } from "../types";
import PhaseButton from "./PhaseButton";

function BracketPhases(props: BracketPhasesProps) {

    if (props.phases.length === 1) {
        return null
    }

    return (
        <View>
            <FlatList
                data={props.phases}
                renderItem={({ item, index }) => index === (props.phases.length - 1)
                    ? <PhaseButton phase={item} selectPhase={props.selectPhase} />
                    : <PhaseButton phase={item} selectPhase={props.selectPhase} style={{ marginRight: 10 }} />}
                horizontal={true}
                contentContainerStyle={styles.container}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10
    }
})

export default BracketPhases
