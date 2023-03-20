
import { useNavigation, useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { EventCardNavigationProp } from "../navTypes";
import PlaceholderImage from "../Shared/PlaceholderImage";
import { MainText } from "../Shared/ThemedText";
import { APIImage, FullEventDetails } from "../types";


function getVideogameImageUrl(images: APIImage[]): string {
    let imageUrl = images.reduce((prev, cur) => {
        if (cur.type === "primary-quality") {
            return cur.url;
        } else if (cur.type === 'primary' && prev == '') {
            return cur.url;
        }
        return prev;
    }, '');

    return imageUrl;
}


const EventCard = ({ event }: { event: Pick<FullEventDetails, "id" | "name" | "videogame"> }) => {


    const navigation = useNavigation<EventCardNavigationProp>();

    if (event == undefined || Object.keys(event).length === 0) {
        return null
    }

    const name = event.name;

    const { colors } = useTheme();
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            borderColor: colors.border,
            borderWidth: 1,
            borderStyle: 'solid',
            backgroundColor: colors.card
        },
        game_image: {
            resizeMode: 'stretch',
            flex: 1,
        },
        game_container: {
            width: 100,
            height: 100,
            borderColor: colors.border,
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

    const colorCSS = StyleSheet.create({
        container: {
            borderColor: colors.border,
            backgroundColor: colors.card
        },
        game_container: {
            borderColor: colors.border
        }
    })

    const imageLogo = getVideogameImageUrl(event.videogame.images);

    const eventTouch = () => {
        console.log(event);
        navigation.navigate("Event", event);
    }

    return (
        <TouchableOpacity onPress={eventTouch} delayPressIn={50}>
            <View style={[styles.container, colorCSS.container]}>
                <View style={[styles.game_container, colorCSS.game_container]}>
                    <PlaceholderImage imageSrc={imageLogo} placeholder="game" style={styles.game_image} />
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
})

export default EventCard;
