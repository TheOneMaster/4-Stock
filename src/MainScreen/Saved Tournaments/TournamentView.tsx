import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

import { PlaceholderImage, TransparentCard } from "../../Shared";
import { TitleText } from "../../Shared/Text";
import { SavedTournamentsCardNavigationProp } from "../../navTypes";
import { TournamentData } from "./types";



interface TournamentViewProps {
    data: TournamentData
    height: number
}

export function TournamentView({data, height}: TournamentViewProps) {

    const navigation = useNavigation<SavedTournamentsCardNavigationProp>()

    const image = data.images?.find(image => image?.url)?.url;
    const tournamentID = data.id;


    const clickGesture = Gesture.Tap().onStart(_ => {
        if (!tournamentID) return
        runOnJS(navigation.navigate)({name: "Tournament", params: {id: tournamentID}});
    });

    const longPressGesture = Gesture.LongPress().onStart(() => {
        console.log("Long Press Tournament: ", data.name);
    })

    const allGestures = Gesture.Race(clickGesture, longPressGesture);



    return (
        <GestureDetector gesture={allGestures}>
            <TransparentCard style={styles.container}>
                <View style={{height: height}}>
                    <PlaceholderImage imageSrc={image} style={styles.image} resize="cover" />
                </View>
                <View>
                    <TitleText style={styles.title} numberOfLines={2}>{data.name}</TitleText>
                </View>
            </TransparentCard>
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
    }
})
