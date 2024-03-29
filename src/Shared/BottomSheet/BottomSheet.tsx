import React, { useCallback, useImperativeHandle } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { BottomSheetProps, BottomSheetRefProps } from "./types";


const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

export const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>((props: BottomSheetProps, ref) => {

    // TODO: Add params that controls each step for the bottom sheet

    const MAX_TRANSLATE_Y = props.maxSize ? props.maxSize : -SCREEN_HEIGHT / 1.5;
    const MIN_TRANSLATE_Y = props.minSize ? props.minSize : -SCREEN_HEIGHT / 2;

    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
        "worklet";
        active.value = destination !== 0;
        translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
        return active.value
    }, [])

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive])

    const dropOverlay = () => {
        if (props.setOverlay) {
            props.setOverlay(false)
        }
    }


    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
        })
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
        })
        .onEnd(() => {
            if (translateY.value < (MIN_TRANSLATE_Y + MAX_TRANSLATE_Y) / 2) {
                scrollTo(MAX_TRANSLATE_Y);
            } else if (translateY.value > MIN_TRANSLATE_Y / 1.25) {
                scrollTo(0);
                runOnJS(dropOverlay)()
            } else {
                scrollTo(MIN_TRANSLATE_Y);
            }
        });

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        }
    })

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.container, props.style, reanimatedStyle]}>
                {props.children}
            </Animated.View>
        </GestureDetector>
    )
})

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT,
        width: "100%",
        position: "absolute",
        top: SCREEN_HEIGHT,
        // backgroundColor: "purple"
    }
})
