import { useNavigation, useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";

import { truthyFilter } from "../../helper";
import { FeaturedTournamentCardNavigationProp } from "../../navTypes";
import { getImageByType, MainText, PlaceholderImage, TransparentCard } from "../../Shared";
import { LargeTournamentCardProps } from "./types";

function LargeTournamentCard(props: LargeTournamentCardProps) {

    const images = props.images?.filter(truthyFilter) ?? [];
    const profileImage = getImageByType(images, 'profile');
    const { colors } = useTheme()
    const navigation = useNavigation<FeaturedTournamentCardNavigationProp>();

    function handlePress() {
        navigation.push("Tournament", { id: props.id })
    }

    return (
        <View style={styles.container}>

            <TransparentCard touchable style={styles.imageContainer} onPress={handlePress}>
                <PlaceholderImage imageSrc={profileImage.url} placeholder="tournament" style={[styles.image, { borderColor: colors.border }]} />
            </TransparentCard>

            <MainText style={styles.title}>{props.name}</MainText>

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
        borderWidth: 1,
        overflow: "hidden",
        flex: 1
    },
    image: {
        width: "100%",
        height: "100%",
    },
    title: {
        // backgroundColor: "red",
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default LargeTournamentCard;
