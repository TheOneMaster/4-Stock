import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { truthyFilter } from "../../helper";
import { FeaturedTournamentCardNavigationProp } from "../../navTypes";
import { getImageByType, PlaceholderImage, TransparentCard } from "../../Shared";
import { TitleText } from "../../Shared/Text";
import { LargeTournamentCardProps } from "./types";

function LargeTournamentCard(props: LargeTournamentCardProps) {

    const images = props.images?.filter(truthyFilter) ?? [];
    const profileImage = getImageByType(images, 'profile');
    const navigation = useNavigation<FeaturedTournamentCardNavigationProp>();

    const handlePress = useCallback(() => {
        navigation.push("Tournament", { id: props.id });
    }, [navigation, props.id])

    return (
        <View style={styles.container}>

            <TransparentCard touchable={true} style={styles.imageContainer} onPress={handlePress}>
                <PlaceholderImage imageSrc={profileImage.url} placeholder="tournament" style={styles.image} />
            </TransparentCard>

            <TitleText style={styles.title} adjustsFontSizeToFit numberOfLines={2}>{props.name}</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    imageContainer: {
        width: 140,
        height: 140,
        borderRadius: 10,
        borderWidth: 2,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    title: {
        textAlign: "center",
    }
});

export default LargeTournamentCard;
