import { G, Rect, Svg } from "react-native-svg"
import { MATCH_HEIGHT, MATCH_WIDTH, MatchResult } from "./MatchSVG"
import { BracketRounds, convertSets } from "./Main"
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated"
import { Dimensions, StyleSheet, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { getBracketData } from "./BracketData"
import { BracketData, Position } from "./types"

interface TreeSVGProps {
    bracket: ReturnType<typeof convertSets>
}

const multiplierX = 160;
const multiplierY = 60;

const SCREEN_DIMENSIONS = Dimensions.get("screen");
const SCREEN_HEIGHT = SCREEN_DIMENSIONS.height;
const SCREEN_WIDTH = SCREEN_DIMENSIONS.width;


const BRACKET_SEPERATOR = 50;

export function TreeSVG(props: TreeSVGProps) {


    const bracket = props.bracket.winners;

    // Round manipulation
    const bracketAnalysis = getBracketData(props.bracket);
    const {maxLength: winnerLength } = bracketAnalysis.winners;
    const {maxLength: loserLength} = bracketAnalysis.losers
    const {length} = bracketAnalysis.total;


    const roundOffset = bracketAnalysis.total.roundOffset;

    const losersPosition: Position = {
        x: 0,
        y: (winnerLength * multiplierY) + BRACKET_SEPERATOR
    }



    // SVG variables
    const svgWidth = ((length - roundOffset) * multiplierX) + MATCH_WIDTH + (styles.svgContainer.left);
    const svgHeight = ((winnerLength * multiplierY) + (styles.svgContainer.top * 2)) + BRACKET_SEPERATOR + ((loserLength * multiplierY) + (styles.svgContainer.top))

    // Transform values
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const context = useSharedValue({ x: 0, y: 0 });

    const viewHeight = useSharedValue(0);

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }, { translateY: translateY.value }]
        }
    });

    const clampedTranslateX = useDerivedValue(() => {
        const leftBound = Math.min(translateX.value, 0);
        const rightBound = -(svgWidth - SCREEN_WIDTH + styles.svgContainer.left);

        return Math.max(leftBound, rightBound);
    });
    const clampedTranslateY = useDerivedValue(() => {
        const upperBound = Math.min(translateY.value, 0);
        const lowerBound = -(svgHeight - viewHeight.value + styles.svgContainer.top);

        return Math.max(upperBound, lowerBound);
    })


    const panGesture = Gesture.Pan().onStart(() => {
        context.value = { x: clampedTranslateX.value, y: clampedTranslateY.value };
    }).onUpdate(event => {
        translateX.value = event.translationX + context.value.x;
        translateY.value = event.translationY + context.value.y;
    }).onEnd(() => {
        translateX.value = clampedTranslateX.value;
        translateY.value = clampedTranslateY.value;
    })


    return (
        <GestureDetector gesture={panGesture}>
            <View style={styles.gestureView} onLayout={(event => {
                viewHeight.value = event.nativeEvent.layout.height;
            })}>
                <Animated.View style={[styles.transformView, rStyle]}>

                    <Svg height={svgHeight} width={svgWidth}>
                        <G x={styles.svgContainer.left} y={styles.svgContainer.top}>
                            <BracketSVG bracket={bracket} bracketAnalysis={bracketAnalysis.winners} offsetRounds={roundOffset} position={{x: 0, y: 0}}  />
                            <BracketSVG bracket={props.bracket.losers} bracketAnalysis={bracketAnalysis.losers} offsetRounds={roundOffset} position={losersPosition} />
                        </G>
                    </Svg>

                </Animated.View>
            </View>
        </GestureDetector>
    )
}

interface BracketSVGProps {
    bracket: BracketRounds
    position: Position 
    bracketAnalysis: BracketData,
    offsetRounds: number

}

function BracketSVG(props: BracketSVGProps) {

    const {rounds, roundOffset} = props.bracketAnalysis;
    const {x, y} = props.position

    return (
        <>
        
        <G x={x} y={y}>
            {rounds.map(round => {
                const offsetX = (Math.abs(round) - roundOffset) * multiplierX;
                const sets = props.bracket[round];

                return sets.map((set, index) => {
                    const offsetY = index * multiplierY;
                    return <MatchResult match={set} offsetX={offsetX} offsetY={offsetY} key={set.id} />
                })
            })}

        </G>
        
        </>
    )


}



const styles = StyleSheet.create({
    svgContainer: {
        top: 10,
        left: 10
    },
    gestureView: {
        // borderWidth: 1,
        // borderColor: "red",
        overflow: "hidden"
    },
    transformView: {
        // borderWidth: 1,
        // color: "green"
    }
})
