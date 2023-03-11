import { useTheme } from "@react-navigation/native";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { DropdownOption } from "../../Shared/types";
import { Phase } from "../../types";

interface PhaseButtonProps {
    phase: Phase
    selectPhase: React.Dispatch<React.SetStateAction<Phase>>
    style?: StyleProp<ViewStyle>
}


const PhaseButton = (props: PhaseButtonProps) => {

    const { colors } = useTheme();

    const colorsCSS = StyleSheet.create({
        container: {
            borderColor: colors.border,
            backgroundColor: colors.card2
        }
    });

    const testClick = () => {
        console.log(props.phase.name);
        requestAnimationFrame(() => {
            props.selectPhase(props.phase)
        })
    }


    return (
        <TouchableOpacity onPress={testClick} style={[styles.container, colorsCSS.container, props.style]}>
            <Text style={{ color: colors.text }}>{props.phase.name}</Text>
        </TouchableOpacity>

        // <Text>{name}</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 0,
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        // marginLeft: 10
    }
})

export default PhaseButton;
