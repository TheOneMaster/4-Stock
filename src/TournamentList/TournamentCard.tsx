import { useTheme } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { convertDateToString } from "../helper";
import PlaceholderImage from "../PlaceholderImage";

export const TournamentCard = (props) => {
    const id = props.id;
    const name = props.name;
    const city = props.city;
    const date = convertDateToString(props.startAt);
    const profile_image = props.images.reduce((prev, cur) => {
        if (cur.type === 'profile') {
            return cur;
        }
        return prev;
    }, {});

    const navigation = props.navigation;

    const { colors } = useTheme();
    const style = props.style || {};
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: colors.border,
            borderStyle: "solid",
            backgroundColor: colors.card
        },

        imageContainer: {
            width: 100,
            height: 100,
            alignSelf: "center",
        },
        image: {
            overflow: "hidden",
            resizeMode: "contain",
            width: '100%',
            height: '100%'
        },

        textBox: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            flex: 1
        },
        detailsText: {
            flex: 1,
            justifyContent: 'flex-end',
            // alignItems: 'flex-end',
            // backgroundColor: 'red'
        },
        text: {
            color: colors.secondaryText
        },

        title: {
            fontWeight: 'bold',
            // marginVertical: 10,
            color: colors.text,
            flexWrap: 'wrap',
            flexShrink: 1
        }
    })

    function navigateToTournament() {
        console.log(id);

        const params = {
            id: id,
            name: name,
            city: city,
            date: props.startAt,
            images: props.images
        }

        navigation.navigate("Tournament", params);
    }

    return (
        <Pressable style={style} onPress={navigateToTournament}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <PlaceholderImage style={styles.image} imageSrc={profile_image.url}/>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.title}>{name}</Text>
                    <View style={styles.detailsText}>
                        <Text style={styles.text}>{city}</Text>
                        <Text style={styles.text}>{date}</Text>
                    </View>
                </View>
            </View>
        </Pressable>

    )


}
