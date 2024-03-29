import React, { useCallback, useImperativeHandle } from "react"
import { StyleSheet } from "react-native"
import { useTheme } from "@react-navigation/native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

import { TransparentCard } from "../../Shared"
import { IoniconsThemed } from "../../Shared/IconTheme"
import { CustomText } from "../../Shared/Text"
import { FilterButtonProps, FilterButtonRefProps } from "./types"

const MAX_WIDTH = 200;

export const FilterButton = React.forwardRef<FilterButtonRefProps, FilterButtonProps>((props: FilterButtonProps, ref) => {
    const { colors } = useTheme();
    const { onPress } = props;
    const buttonWidth = useSharedValue(MAX_WIDTH);

    const toggleFilter = useCallback((active: boolean) => {
        "worklet";
        const newWidth = active ? MAX_WIDTH : 0;
        buttonWidth.value = withSpring(newWidth, { damping: 50, mass: 0.5 });
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
            <IoniconsThemed name="filter-outline" size={30} />
            <Animated.View style={[styles.textView, animatedStyle]}>
                <CustomText font="Anuphan" style={styles.buttonText}>Filter</CustomText>
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
        borderRadius: 5,
        borderWidth: 1
    },

    textView: {
        overflow: "hidden",
        maxHeight: 20,
        alignSelf: "center",
    },
    buttonText: {
        marginLeft: 5,
        fontSize: 16,
        includeFontPadding: false,
        textAlignVertical: "center",
        verticalAlign: "middle",
        lineHeight: 20
    }
})
