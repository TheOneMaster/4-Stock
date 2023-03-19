import { Image, StyleSheet, Text, View } from "react-native";
import { getNumberOrdinal } from "../helper";
import PlaceholderImage from "../Shared/PlaceholderImage";
import { MainText } from "../Shared/ThemedText";
import { UserEvent } from "../types";
import { useTheme } from "@react-navigation/native";

interface EventCarouselItemProps {
    event: UserEvent
}

function EventCarouselItem(props: EventCarouselItemProps) {

    const { colors } = useTheme();
    const colorCSS = StyleSheet.create({
        container: {
            borderColor: colors.border,
            backgroundColor: colors.card
        },
        imageContainer: {
            borderColor: colors.border
        }
    });

    const tournamentProfileImageUrl = props.event.tournament.images.reduce<string>((prev, cur) => {
        return cur.url
    }, "");


    return (
        <View style={[styles.container, colorCSS.container]}>

            <View style={[styles.tournamentImageContainer, colorCSS.imageContainer]}>
                <PlaceholderImage placeholder="tournament" imageSrc={tournamentProfileImageUrl} style={styles.tournamentImage} />
            </View>

            <View style={{ flexShrink: 1 }}>
                <MainText style={styles.title} numberOfLines={2}>{props.event.tournament.name}</MainText>

                <View style={styles.placementContainer}>
                    <Text style={{ flexShrink: 1, flexWrap: "wrap" }} numberOfLines={2}>
                        <MainText>{getNumberOrdinal(props.event.userEntrant.standing.placement).toString()}</MainText>
                        <MainText> at </MainText>
                        <Text style={{ color: colors.primary }}>{props.event.name}</Text>
                    </Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        maxWidth: 350,
        borderWidth: 1,
        borderRadius: 10
    },
    tournamentImage: {
        height: "100%",
        width: "100%"
    },
    tournamentImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 2,
        overflow: "hidden",
        marginRight: 8
    },
    title: {
        flexGrow: 1,
        fontWeight: "500",
        flexWrap: "wrap"
    },
    placementContainer: {
        flexDirection: "row",
        flexShrink: 1,
    }
})

export default EventCarouselItem
