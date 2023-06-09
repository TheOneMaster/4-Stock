import { useNavigation, useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

import { useState } from "react";
import { PlaceholderImage } from "../../Shared";
import { TitleText } from "../../Shared/Text";
import { SavedTournamentsCardNavigationProp } from "../../navTypes";
import { TournamentData } from "./types";



interface TournamentViewProps {
    data: TournamentData
    height: number
    onPress?: () => void
    longPress?: () => void
}

export function TournamentView(props: TournamentViewProps) {

    const [selected, setSelected] = useState(false);

    const {colors} = useTheme();
    const navigation = useNavigation<SavedTournamentsCardNavigationProp>();

    const image = props.data.images?.find(image => image?.url)?.url;
    const tournamentID = props.data.id;


    const toggleSelected = () => {
        setSelected((prevState) => !prevState)
    }

    const clickGesture = Gesture.Tap().onStart(_ => {
        if (!tournamentID) return
        runOnJS(navigation.navigate)({name: "Tournament", params: {id: tournamentID}});
    });

    const longPressGesture = Gesture.LongPress().onStart(() => {
        console.log("Long Press Tournament: ", props.data.name);

        runOnJS(toggleSelected)()
    })

    const allGestures = Gesture.Race(clickGesture, longPressGesture);

    const animStyle = useAnimatedStyle(() => {
        return {
            borderColor: selected ? colors.primary : colors.border,
            borderWidth: selected ? 3 : 1
        }
    })



    return (
        <GestureDetector gesture={allGestures}>
            <Animated.View style={[styles.container, animStyle]}>
                <View style={{height: props.height}}>
                    <PlaceholderImage imageSrc={image} placeholder="tournament" style={styles.image} resize="cover" />
                </View>
                <View>
                    <TitleText style={styles.title} numberOfLines={2}>{props.data.name}</TitleText>
                </View>

                {selected
                ? <View style={styles.selectionCircle}>
                 <AntDesign name="check" color="black" />
                </View>
                : null}

            </Animated.View>
        </GestureDetector>
    )

}

const styles = StyleSheet.create({
    container: {
        width: "50%",
        borderWidth: 0.8
    },
    image: {
        flexGrow: 1,
    },
    title: {
        textAlign: "center"
    },
    selectionCircle: {
        position: "absolute",
        right: 5,
        top: 5,
        backgroundColor: "white",
        height: 20,
        width: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "black"
    }
})
