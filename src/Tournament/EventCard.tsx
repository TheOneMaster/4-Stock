
import { useNavigation, useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { EventCardNavigationProp } from "../navTypes";
import { getImageByType } from "../Shared/APIConverters";
import PlaceholderImage from "../Shared/PlaceholderImage";
import { MainText } from "../Shared/ThemedNativeElements";
import { EventCardProps } from "./types";

const EventCard = ({ event }: EventCardProps) => {
    const { colors } = useTheme();

    if (event == undefined || Object.keys(event).length === 0) {
        return null
    }

    const name = event.name;
    const videogameImages = event.videogame?.images?.flatMap(image => image ? [image] : []) ?? [];
    const imageLogo = getImageByType(videogameImages, ['primary', 'primary-quality']);
    const colorCSS = StyleSheet.create({
        container: {
            borderColor: colors.border,
            backgroundColor: colors.card
        },
        game_container: {
            borderColor: colors.border
        }
    });
    const navigation = useNavigation<EventCardNavigationProp>();

    const eventTouch = () => {
        console.log(event);

        const eventID = event.id

        if (eventID) {

            navigation.push("Event", {
                id: eventID,
                type: event.type ?? 2
            });
        }

    }

    return (
        <TouchableOpacity onPress={eventTouch} delayPressIn={50}>
            <View style={[styles.container, colorCSS.container]}>
                <View style={[styles.game_container, colorCSS.game_container]}>
                    <PlaceholderImage imageSrc={imageLogo.url} placeholder="game" style={styles.game_image} />
                </View>
                <View style={styles.event_text}>
                    <MainText style={styles.event_title}>{name}</MainText>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    game_image: {
        resizeMode: 'stretch',
        flex: 1,
    },
    game_container: {
        width: 100,
        height: 100,
        borderStyle: 'solid',
    },
    event_text: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    event_title: {
        fontWeight: 'bold',
        fontSize: 20,
        flexWrap: 'wrap',
        flexShrink: 1,
    }
});

export default EventCard;
