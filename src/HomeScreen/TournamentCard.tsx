import { useTheme } from "@react-navigation/native";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { convertDateToString } from "../helper";
import { TournamentCardNavigationProp } from "../navTypes";
import { APIImage } from "../types";

import PlaceholderImage from "../Shared/PlaceholderImage";
import { MainText, SubtitleText } from "../Shared/ThemedText";


type TournamentCardProps = {
    id: number,
    name: string,
    city: string,
    startAt: number,
    images: APIImage[],
    navigation: TournamentCardNavigationProp,
    style?: StyleProp<ViewStyle>
}

export const TournamentCard = ({ id, name, city, startAt, images, navigation, style }: TournamentCardProps) => {
    const dateString = convertDateToString(startAt);
    const profile_image = images.reduce((prev, cur) => {
        if (cur.type === 'profile') {
            return cur;
        }
        return prev;
    }, {} as APIImage);

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
        // console.log(id.toString());
        navigation.push("Tournament", { id: id.toString() });
    }

    return (
        <Pressable style={style} onPress={navigateToTournament}>
            <View style={[styles.container, colorCSS.container]}>
                <View style={styles.imageContainer}>
                    <PlaceholderImage style={styles.image} imageSrc={profile_image.url} />
                </View>
                <View style={styles.textBox}>
                    <MainText style={styles.title}>{name}</MainText>
                    <View style={styles.detailsText}>
                        <SubtitleText style={colorCSS.text}>{city}</SubtitleText>
                        <SubtitleText style={colorCSS.text}>{dateString}</SubtitleText>
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
