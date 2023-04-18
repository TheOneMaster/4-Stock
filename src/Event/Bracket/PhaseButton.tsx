import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

import { MainText, PrimaryCard, SecondaryCard } from "../../Shared"
import { testPhaseButtonProps } from "./types"

export function TestPhaseButton({ phase, selectPhase, active }: testPhaseButtonProps) {

    const { colors } = useTheme();

    function handlePress() {
        if (phase?.id) selectPhase(phase.id);
    }

    const activeColors = StyleSheet.create({
        text: {
            ...styles.text,
            color: colors.primary,
            fontWeight: "bold"
        },
        container: {
            ...styles.container,
            borderColor: colors.primary,
            borderWidth: 1
        }
    });

    return (
        <SecondaryCard touchable onPress={handlePress} style={active ? activeColors.container : styles.container}>
            <MainText style={active ? activeColors.text : styles.text}>{phase?.name}</MainText>
        </SecondaryCard>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        elevation: 1
    },
    text: {
        fontSize: 16
    }
});
