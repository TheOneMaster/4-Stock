import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { EventCardProps } from "./types";

import { EventCardNavigationProp } from "../navTypes";
import { PrimaryCard, TransparentCard } from "../Shared";
import { getImageByType } from "../Shared/APIConverters";
import PlaceholderImage from "../Shared/PlaceholderImage";
import { TitleText } from "../Shared/Text";

const EventCard = ({ event, style }: EventCardProps) => {
    const navigation = useNavigation<EventCardNavigationProp>();

    if (event === null) {
        return null
    }

    const name = event.name;
    const videogameImages = event.videogame?.images?.flatMap(image => image ? [image] : []) ?? [];
    const imageLogo = getImageByType(videogameImages, 'primary');

    const eventTouch = useCallback(() => {
        console.log(event);
        const eventID = event.id;

        if (eventID) {
            navigation.push("Event", { id: eventID, type: event.type ?? 2 })
        }
    }, [event]);

    return (
        <TouchableOpacity onPress={eventTouch} delayPressIn={50} style={style}>
            <PrimaryCard style={styles.container}>
                <TransparentCard style={styles.game_container}>
                    <PlaceholderImage imageSrc={imageLogo.url} placeholder="game" resize="stretch" style={styles.game_image} />
                </TransparentCard>
                <View style={styles.event_text}>
                    <TitleText style={styles.event_title}>{name}</TitleText>
                </View>
            </PrimaryCard>
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
        height: "100%",
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
        flexWrap: 'wrap',
        flexShrink: 1,
    }
});

export default EventCard;
