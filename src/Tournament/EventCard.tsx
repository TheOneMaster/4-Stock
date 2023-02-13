
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

import { useNavigation, useTheme } from "@react-navigation/native";

import { PlaceholderGame } from "../Shared/Logos";
import { ImageType } from "../types";
import { useState } from "react";
import PlaceholderImage from "../Shared/PlaceholderImage";


function getVideogameImageUrl(images: ImageType[]): string {
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


const EventCard = ({ event }) => {


    const navigation = useNavigation();

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
            color: colors.text
        }
    });

    const imageLogo = getVideogameImageUrl(event.videogame.images);

    const eventTouch = () => {
        console.log(event);
        navigation.navigate("Event", event);
    }

    return (
        <TouchableOpacity onPress={eventTouch} delayPressIn={50}>
            <View style={styles.container}>
                <View style={styles.game_container}>
                    <PlaceholderImage imageSrc={imageLogo} placeholder={PlaceholderGame} style={styles.game_image}/>
                </View>
                <View style={styles.event_text}>
                    <Text style={styles.event_title}>{name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}

export default EventCard;
