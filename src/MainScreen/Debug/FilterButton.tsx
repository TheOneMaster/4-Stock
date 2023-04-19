import { useTheme } from "@react-navigation/native"
import React, { useCallback, useImperativeHandle } from "react"
import { StyleSheet } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

import { MainText, TransparentCard } from "../../Shared"
import { IoniconsThemed } from "../../Shared/IconTheme"
import { FilterButtonProps, FilterButtonRefProps } from "./types"

export const FilterButton = React.forwardRef<FilterButtonRefProps, FilterButtonProps>((props: FilterButtonProps, ref) => {

    const { colors } = useTheme();
    const { onPress } = props;
    const buttonWidth = useSharedValue(100);

    const toggleFilter = useCallback((active: boolean) => {
        "worklet";
        const newWidth = active ? 100 : 0;
        buttonWidth.value = withSpring(newWidth, { damping: 50, mass: 0.3 });
    }, []);

    useImperativeHandle(ref, () => ({ toggleFilter }), [toggleFilter]);

    const animatedStyle = useAnimatedStyle(() => ({
        maxWidth: buttonWidth.value
    }), []);

    const handlePress = () => {
        onPress();
    }

    return (
        <TransparentCard touchable onPress={handlePress} style={[styles.innerView, props.style, { backgroundColor: colors.primary }]}>
            <IoniconsThemed name="filter-outline" size={25} />
            <Animated.View style={[styles.textView, animatedStyle]}>
                <MainText style={styles.buttonText}>Filter</MainText>
            </Animated.View>
        </TransparentCard>
    )


})

const styles = StyleSheet.create({
    container: {
    },
    innerView: {
        flexDirection: "row",
        padding: 5,
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1
    },

    textView: {
        overflow: "hidden",
        maxHeight: 20
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 15
    }
})
