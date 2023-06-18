import { StyleSheet, View } from "react-native";

import { SubtitleProps, TournamentCardProps } from "./types";

import { convertDateToString, truthyFilter } from "../../helper";
import { getImageByType, PlaceholderImage, PrimaryCard, TransparentCard } from "../../Shared";
import { IoniconsThemed } from "../../Shared/IconTheme";
import { SubtitleText, TitleText } from "../../Shared/Text";


export const TournamentCard = ({ id, name, city, startAt, images, navigation, style }: TournamentCardProps) => {
    const dateString = startAt ? convertDateToString(startAt) : "Date not provided";
    const usableImages = images?.filter(truthyFilter) ?? [];
    const profile_image = getImageByType(usableImages, "profile")

    const navigateToTournament = () => {
        navigation.push("Tournament", { id: id })
    }

    return (
        <PrimaryCard touchable onPress={navigateToTournament} style={[styles.container, style]}>

            <TransparentCard style={styles.imageContainer}>
                <PlaceholderImage style={styles.image} imageSrc={profile_image?.url} resize="stretch" />
            </TransparentCard>

            <View style={styles.textBox}>
                <TitleText numberOfLines={3} adjustsFontSizeToFit={true} style={styles.title}>{name}</TitleText>
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
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: "solid"
    },
    imageContainer: {
        width: 100,
        minHeight: 100,
        borderRightWidth: 1,
    },
    image: {
        height: "100%",
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
        flexWrap: 'wrap',
        flexShrink: 1,
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
