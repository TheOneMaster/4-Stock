import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { GameMatch } from "./GameMatch";
import { BracketRounds } from "./Main";

interface BracketTreeProps {
    translateX: Animated.SharedValue<number>;
    translateY: Animated.SharedValue<number>;
    bracket: BracketRounds
}



const offsetXMultiplier = 200;
const offsetYMultiplier = 50;

export function BracketTree(props: BracketTreeProps) {

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: props.translateX.value}, {translateY: props.translateY.value}],
        }
    })

    const bracketRounds = Object.keys(props.bracket).map(num => parseInt(num));


    return (
        <Animated.View style={[styles.container, rStyle]}>
            {bracketRounds.map((round) => {

                const sets = props.bracket[round];

                return sets.map((set, index) => {
                    const offsetX = (Math.abs(round) - 1) * offsetXMultiplier;
                    const offsetY = (index) * offsetYMultiplier; 
    
                    return <GameMatch match={set} offsetX={offsetX} offsetY={offsetY} key={set.id}/>
                })
                
            })}
        </Animated.View>
    )

}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        zIndex: 1,
        // borderWidth: 1,
        // borderColor: "red",
        position: "relative",
        left: 10,
        top: 10
    }
})
