import { Dimensions, StyleProp, StyleSheet, ViewStyle } from "react-native"
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated"
import { G, Rect, Svg } from "react-native-svg"
import { Layout } from "./Bracket"
import { getBracketData } from "./BracketData"
import { MATCH_WIDTH, MatchResult } from "./MatchSVG"
import { BracketData, BracketRounds, FullBracket, Position } from "./types"

interface TreeSVGProps {
    bracket: FullBracket
    svgLayout: SharedValue<Layout>
    viewLayout: SharedValue<Layout>
    translateX: SharedValue<number>
    translateY: SharedValue<number>
    style?: StyleProp<ViewStyle>
}

const multiplierX = 160;
const multiplierY = 60;

const BRACKET_SEPERATOR = 50;

// Window dimensions
const SCREEN_DIMENSIONS = Dimensions.get("window");
const SCREEN_HEIGHT = SCREEN_DIMENSIONS.height;
const SCREEN_WIDTH = SCREEN_DIMENSIONS. width;

export function TreeSVG(props: TreeSVGProps) {


    const bracket = props.bracket.winners;

    // Round manipulation
    const bracketAnalysis = getBracketData(props.bracket);
    const {maxLength: winnerLength, roundOffset: winnerOffset } = bracketAnalysis.winners;
    const {maxLength: loserLength, roundOffset: loserOffset} = bracketAnalysis.losers
    const {length} = bracketAnalysis.total;


    const roundOffset = bracketAnalysis.total.roundOffset;

    const losersPosition: Position = {
        x: 0,
        y: (winnerLength * multiplierY) + BRACKET_SEPERATOR
    }

    // SVG variables
    const svgWidth = ((length - roundOffset) * multiplierX) + MATCH_WIDTH + (styles.svgContainer.left * 2);
    const svgHeight = ((winnerLength * multiplierY) + (styles.svgContainer.top * 2)) + BRACKET_SEPERATOR + ((loserLength * multiplierY));

    props.svgLayout.value = {height: svgHeight, width: svgWidth};

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: props.translateX.value }, { translateY: props.translateY.value }]
        }
    });

    return (
        <Animated.View style={[props.style, rStyle]}>
            <Svg height={svgHeight} width={svgWidth}>
                <Rect x={0} y={0} width="100%" height="100%" stroke="blue" />
                <G x={styles.svgContainer.left} y={styles.svgContainer.top}>
                    <BracketSVG bracket={bracket} bracketAnalysis={bracketAnalysis.winners} offsetRounds={winnerOffset} position={{x: 0, y: 0}}  />
                    <BracketSVG bracket={props.bracket.losers} bracketAnalysis={bracketAnalysis.losers} offsetRounds={loserOffset} position={losersPosition} />
                </G>
            </Svg>
        </Animated.View>
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

    const offset = props.offsetRounds;

    return (
        <>
        
        <G x={x} y={y}>
            {rounds.map(round => {
                const offsetX = (Math.abs(round) - offset) * multiplierX;
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
        borderWidth: 1,
        borderColor: "red",
        overflow: "hidden"
    },
    transformView: {
        // flexGrow: 1,
        // borderWidth: 1,
        // color: "green",
        backgroundColor: "green",
        // flexShrink: 1
        height: "100%"
    }
})
