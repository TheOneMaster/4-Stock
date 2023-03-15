import { useTheme } from "@react-navigation/native";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { Phase } from "../../types";

interface PhaseButtonProps {
    phase: Phase
    selected?: boolean
    selectPhase: React.Dispatch<React.SetStateAction<Phase>>
    style?: StyleProp<ViewStyle>
}


const PhaseButton = (props: PhaseButtonProps) => {

    const { colors } = useTheme();

    const colorsCSS = StyleSheet.create({
        container: {
            borderColor: props.selected ? colors.primary : colors.border,
            backgroundColor: colors.card2
        }
    });

    const testClick = () => {
        requestAnimationFrame(() => {
            props.selectPhase(props.phase)
        })
    }


    return (
        <TouchableOpacity onPress={testClick} style={[styles.container, colorsCSS.container, props.style]}>
            <Text style={[styles.text, { color: colors.text }]}>{props.phase.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        elevation: 2
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
    }
})

export default PhaseButton;
