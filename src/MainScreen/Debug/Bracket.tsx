import { Dimensions, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { TitleText } from "../../Shared/Text";
import { TreeSVG } from "./TreeSVG";
import { FullBracket } from "./types";

interface GameBracketProps {
    bracket: FullBracket
    title?: string
    style?: StyleProp<ViewStyle>
}

export interface Layout {
    height: number
    width: number
}

const WINDOW_DIM = Dimensions.get("window")
const WINDOW_HEIGHT = WINDOW_DIM.height;
const WINDOW_WIDTH = WINDOW_DIM.width;

export function DoubleElimBracket(props: GameBracketProps) {
    const svgLayout = useSharedValue<Layout>({height: 0, width: 0});
    const viewLayout = useSharedValue<Layout>({height: 0, width: 0});

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const context = useSharedValue({ x: 0, y: 0 });

    const clampedTranslateX = useDerivedValue(() => {
        const leftBound = Math.min(translateX.value, 0);
        const rightBound = -Math.abs(svgLayout.value.width - viewLayout.value.width);

        return Math.max(leftBound, rightBound);
        // return leftBound
    });
    const clampedTranslateY = useDerivedValue(() => {
        const upperBound = Math.min(translateY.value, 0);
        // const lowerBound = svgHeight
        const lowerBound = -Math.abs(svgLayout.value.height - viewLayout.value.height) ;
        // console.log(lowerBound);

        
        return Math.max(upperBound, lowerBound);
        return upperBound
    })

    const panGesture = Gesture.Pan().onStart(() => {
        context.value = { x: clampedTranslateX.value, y: clampedTranslateY.value };
    }).onUpdate(event => {
        translateX.value = event.translationX + context.value.x;
        translateY.value = event.translationY + context.value.y;
        // console.log(event.translationX, event.translationY)
        console.log(viewLayout.value)
    }).onEnd(() => {
        translateX.value = clampedTranslateX.value;
        translateY.value = clampedTranslateY.value;
    })

    return (
        <View style={[styles.container, props.style]} onLayout={event => {
            const height = WINDOW_HEIGHT - event.nativeEvent.layout.y;
            viewLayout.value = {height: height, width: WINDOW_WIDTH}
        }}>
            {props.title && <TitleText style={{left: 10}}>{props.title}</TitleText>}
            <GestureDetector gesture={panGesture}>
                <View style={styles.gestureView}>
                    <TreeSVG bracket={props.bracket} svgLayout={svgLayout} viewLayout={viewLayout} translateX={translateX} translateY={translateY} />
                </View>
            </GestureDetector>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // left: 10
        // backgroundColor: "red"
    },
    text: {
        left: 10
    },
    gestureView: {
        overflow: "hidden"
    }
})
