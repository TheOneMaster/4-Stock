import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";

import { convertDateToString, truthyFilter } from "../helper";

import { getImageByType } from "../Shared/APIConverters";
import PlaceholderImage from "../Shared/PlaceholderImage";
import { MainText, SubtitleText } from "../Shared/ThemedText";
import { TournamentCardProps } from "./types";

export const TournamentCard = ({ id, name, city, startAt, images, navigation, style, ...props }: TournamentCardProps) => {
    const dateString = startAt ? convertDateToString(startAt) : "Date not provided";

    const usableImages = images?.filter(truthyFilter) ?? [];
    const profile_image = getImageByType(usableImages, "profile")

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
        navigation.push("Tournament", { id: id });
    }

    return (
        <Pressable style={style} onPress={navigateToTournament}>
            <View style={[styles.container, colorCSS.container]}>
                <View style={styles.imageContainer}>
                    <PlaceholderImage style={styles.image} imageSrc={profile_image?.url} />
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
