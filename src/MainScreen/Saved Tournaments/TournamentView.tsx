import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

import { PlaceholderImage } from "../../Shared";
import { TitleText } from "../../Shared/Text";
import { TournamentData } from "./types";



interface TournamentViewProps {
    data: TournamentData
    height: number
    selected: boolean
    onPress?: (tournament: string) => void
    longPress?: (tournament: string) => void
}

export function TournamentView(props: TournamentViewProps) {

    if (!props.data.id) return null

    const { colors } = useTheme();
    const image = props.data.images?.find(image => image?.url)?.url;
    const clickGesture = Gesture.Tap().onFinalize(() => {
        console.log("click")
        if (props.onPress) runOnJS(props.onPress)(props.data.id!);
    });
    const longPressGesture = Gesture.LongPress().onStart(() => {
        console.log("longPress")
        if (props.longPress) runOnJS(props.longPress)(props.data.id!)
    });

    const allGestures = Gesture.Race(longPressGesture, clickGesture)

    return (

        <GestureDetector gesture={allGestures}>

            <View style={[styles.container]}>
                <View style={{ height: props.height }}>
                    <PlaceholderImage imageSrc={image} placeholder="tournament" style={styles.image} resize="cover" />
                </View>
                <View>
                    <TitleText style={styles.title} numberOfLines={2}>{props.data.name}</TitleText>
                </View>

                {props.selected
                    ? <View style={styles.selectionCircle}>
                        <AntDesign name="check" color="black" />
                    </View>
                    : null}

            </View>
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
