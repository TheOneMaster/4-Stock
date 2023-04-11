import { StyleSheet, View } from "react-native";

import { SubtitleProps, TournamentCardProps } from "./types";

import { convertDateToString, truthyFilter } from "../../helper";
import { getImageByType, MainText, PlaceholderImage, PrimaryCard, SubtitleText, TransparentCard } from "../../Shared";
import { IoniconsThemed } from "../../Shared/IconTheme";


export const TournamentCard = ({ id, name, city, startAt, images, navigation, style }: TournamentCardProps) => {
    const dateString = startAt ? convertDateToString(startAt) : "Date not provided";

    const usableImages = images?.filter(truthyFilter) ?? [];
    const profile_image = getImageByType(usableImages, "profile")

    function navigateToTournament() {
        navigation.push("Tournament", { id: id });
    }

    return (
        <PrimaryCard touchable onPress={navigateToTournament} style={styles.container}>
            <TransparentCard style={styles.imageContainer}>
                <PlaceholderImage style={styles.image} imageSrc={profile_image?.url} />
            </TransparentCard>
            <View style={styles.textBox}>
                <MainText style={styles.title}>{name}</MainText>
                <View style={styles.detailsText}>
                    <SubtitleRow text={city} iconName="location-outline" />
                    <SubtitleRow text={dateString} iconName="calendar-outline" />
                </View>
            </View>
        </PrimaryCard>
    )
}


function SubtitleRow({ text, iconName }: SubtitleProps) {

    if (!text) return null;

    return (
        <View style={styles.subtitle}>
            <IoniconsThemed name={iconName} text="secondary" style={styles.subtitleIcon} />
            <SubtitleText>{text}</SubtitleText>
        </View>
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
        borderRightWidth: 1
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
    },

    subtitle: {
        alignItems: "center",
        flexDirection: "row",
    },
    subtitleIcon: {
        marginRight: 5
    }

});

export default TournamentCard;
