import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { BracketRounds } from "./Main";
import { TitleText } from "../../Shared/Text";
import { TreeSVG } from "./TreeSVG";
import { FullBracket } from "./types";

interface GameBracketProps {
    bracket: FullBracket
    title?: string
    style?: StyleProp<ViewStyle>
}

export function GameBracket(props: GameBracketProps) {


    return (
        <View style={[styles.container, props.style]}>
            {props.title && <TitleText style={{left: 10}}>{props.title}</TitleText>}
            <TreeSVG bracket={props.bracket} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // left: 10
    },
    text: {
        left: 10
    }
})
