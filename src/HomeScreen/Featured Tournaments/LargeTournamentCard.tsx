import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

import { truthyFilter } from "../../helper";
import { getImageByType } from "../../Shared/APIConverters";
import PlaceholderImage from "../../Shared/PlaceholderImage";
import { LargeTournamentCardProps } from "./types";
import { MainText } from "../../Shared/ThemedText";
import { FeaturedTournamentCardNavigationProp } from "../../navTypes";

function LargeTournamentCard(props: LargeTournamentCardProps) {

    const images = props.images?.filter(truthyFilter) ?? [];
    const profileImage = getImageByType(images, 'profile');
    const { colors } = useTheme()
    const navigation = useNavigation<FeaturedTournamentCardNavigationProp>();

    function handlePress() {
        navigation.push("Tournament", { id: props.id })
    }

    return (
        <View>

            <Pressable style={styles.container} onPress={handlePress}>
                <PlaceholderImage imageSrc={profileImage.url} placeholder="tournament" style={[styles.image, { borderColor: colors.border }]} />
            </Pressable>

            <MainText style={styles.title}>{props.name}</MainText>

        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 10,
        borderWidth: 1
    },
    title: {
        // backgroundColor: "red",
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default LargeTournamentCard;
