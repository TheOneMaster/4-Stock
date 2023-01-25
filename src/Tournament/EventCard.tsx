
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EventDetails } from "../types";

import Melee from "../../assets/melee.png";
import PlaceHolder from "../../assets/placeholder.png";
import { useTheme } from "@react-navigation/native";

const EventCard = (props) => {

    if (props == undefined) {
        return null
    }

    const event: EventDetails = props.event;
    const name = event.name;
    const videogame = event.videogame.id;

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
            resizeMode: 'cover',
            width: '100%',
            height: '100%'
        },
        game_container: {
            width: 100,
            height: 100,
            borderRightWidth: 1,
            borderColor: colors.border,
            borderStyle: 'solid'
        },
        event_text: {
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 5
        },
        event_title: {
            fontWeight: 'bold',
            fontSize: 20,
            flexWrap: 'wrap',
            flexShrink: 1,
            color: colors.text
        }
    })

    let image = videogame === 1 ?
        <Image source={Melee} style={styles.game_image}></Image> :
        <Image source={PlaceHolder} style={styles.game_image}></Image>;

    const test = () => {
        console.log(props);
    }

    return (
        <TouchableOpacity onPress={test}>
            <View style={styles.container}>
                <View style={styles.game_container}>
                    {image}
                </View>
                <View style={styles.event_text}>
                    <Text style={styles.event_title}>{name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}

export default EventCard;
