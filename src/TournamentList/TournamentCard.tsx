import { useTheme } from "@react-navigation/native";
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { convertDateToString } from "../helper";
import { ImageType } from "../types";
import { HomeDrawerParamList, RootStackParamList } from "../navTypes";

import PlaceholderImage from "../Shared/PlaceholderImage";


type TournamentCardProps = {
    id: number,
    name: string,
    city: string,
    startAt: number,
    images: ImageType[],
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">,
    style?: StyleProp<ViewStyle>
}

export const TournamentCard = ({id, name, city, startAt, images, navigation, style}: TournamentCardProps) => {
    const dateString = convertDateToString(startAt);
    const profile_image = images.reduce((prev, cur) => {
        if (cur.type === 'profile') {
            return cur;
        }
        return prev;
    }, {} as ImageType);

    const { colors } = useTheme();
    const colorCSS = StyleSheet.create({
        container: {
            borderColor: colors.border,
            backgroundColor: colors.card
        },
        text: {
            color: colors.secondaryText
        },
        title: {
            color: colors.text,
        }
    });

    function navigateToTournament() {
        console.log(id);

        const tournamentDetails = {
            id: id,
            name: name,
            city: city,
            date: startAt,
            images: images
        }

        navigation.navigate("Tournament", {tournamentDetails: tournamentDetails});
    }

    return (
        <Pressable style={style} onPress={navigateToTournament}>
            <View style={[styles.container, colorCSS.container]}>
                <View style={styles.imageContainer}>
                    <PlaceholderImage style={styles.image} imageSrc={profile_image.url}/>
                </View>
                <View style={styles.textBox}>
                    <Text style={[styles.title, colorCSS.title]}>{name}</Text>
                    <View style={styles.detailsText}>
                        <Text style={colorCSS.text}>{city}</Text>
                        <Text style={colorCSS.text}>{dateString}</Text>
                    </View>
                </View>
            </View>
        </Pressable>

    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderStyle: "solid"
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
    },
    title: {
        fontWeight: 'bold',
        flexWrap: 'wrap',
        flexShrink: 1
    }

});

export default TournamentCard;
