import { G, Rect, Svg } from "react-native-svg"
import { MATCH_HEIGHT, MATCH_WIDTH, MatchResult } from "./MatchSVG"
import { BracketRounds } from "./Main"
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated"
import { Dimensions, StyleSheet, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"

interface TreeSVGProps {
    bracket: BracketRounds
}

const multiplierX = 160;
const multiplierY = 60;

const SCREEN_DIMENSIONS = Dimensions.get("screen");
const SCREEN_HEIGHT = SCREEN_DIMENSIONS.height;
const SCREEN_WIDTH = SCREEN_DIMENSIONS.width;

export function TreeSVG(props: TreeSVGProps) {

    // Round manipulation
    const rounds = Object.keys(props.bracket).map(round => parseInt(round)).sort((a, b) => Math.abs(a) - Math.abs(b));
    const absRounds = rounds.map(round => Math.abs(round));

    const maxRound = Math.max(...absRounds);
    const minRound = Math.min(...absRounds);

    const roundOffset = minRound;

    const maxLength = Math.max(...rounds.map(round => props.bracket[round].length));
    
    // SVG variables
    const svgWidth = ((maxRound - roundOffset) * multiplierX) + MATCH_WIDTH + (styles.svgContainer.left * 2);
    const svgHeight = ((maxLength - 1) * multiplierY) + MATCH_HEIGHT + (styles.svgContainer.top * 2);

    // Transform values
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const context = useSharedValue({x: 0, y: 0});

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translateX.value}, {translateY: translateY.value}]
        }
    });

    console.log(svgWidth);

    const clampedTranslateX = useDerivedValue(() => {
        const leftBound = Math.min(translateX.value, 0);
        const rightBound = -(svgWidth - SCREEN_WIDTH + styles.svgContainer.left);

        return Math.max(leftBound, rightBound);
    });
    const clampedTranslateY = useDerivedValue(() => {
        const upperBound = Math.min(translateY.value, 0);
        const lowerBound = -svgHeight + styles.svgContainer.top;

        return Math.max(upperBound, lowerBound);
    })


    const panGesture = Gesture.Pan().onStart((event) => {
        context.value = {x: clampedTranslateX.value, y: clampedTranslateY.value};
    }).onUpdate(event => {
        translateX.value = event.translationX + context.value.x;
        translateY.value = event.translationY + context.value.y;
    }).onEnd(event => {
        translateX.value = clampedTranslateX.value;
        translateY.value = clampedTranslateY.value;
    })


    return (
        <GestureDetector gesture={panGesture}>
            <View style={styles.gestureView}>
                <Animated.View style={[rStyle]}>
                    <Svg height={svgHeight} width={svgWidth}>
                    
                        <G x={styles.svgContainer.left} y={styles.svgContainer.top}>
                            {rounds.map(round => {

                                const offsetX = (Math.abs(round) - roundOffset) * multiplierX;
                                
                                const sets = props.bracket[round];

                                return sets.map((set, index) => {
                                    const offsetY = index * multiplierY;
                                    return <MatchResult match={set} offsetX={offsetX} offsetY={offsetY} key={set.id} />;
                                })
                            })}
                        </G>

                    </Svg>
                </Animated.View>
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    svgContainer: {
        top: 10,
        left: 10
    },
    gestureView: {
        borderWidth: 1,
        borderColor: "red"
    }
})
