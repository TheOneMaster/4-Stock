import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { SecondaryCard } from "../../Shared";
import { CustomText } from "../../Shared/Text";
import { testPhaseButtonProps } from "./types";

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
            <CustomText style={active ? activeColors.text : styles.text}>{phase?.name}</CustomText>
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
