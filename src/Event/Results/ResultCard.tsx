import { useNavigation, useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { getNumberOrdinal, truthyFilter } from "../../helper";
import { ResultsNavigationProp } from "../../navTypes";
import { getImageByType } from "../../Shared/APIConverters";
import PlaceholderImage from "../../Shared/PlaceholderImage";
import { MainText, SubtitleText } from "../../Shared/Text";
// import { Participant } from "../../types";
import { Participants, ResultCardProps } from "./types";



function getImagesFromParticipants(participants: Participants): string[] {
    const images = participants.map((participant) => {
        const user = participant?.user;
        const userImages = user?.images;
        const image = userImages ? userImages[0] : null;
        return (image && image.url) ? image.url : '';
    });

    return images;
}

const ResultCard = ({ playerData }: ResultCardProps) => {

    const { colors } = useTheme();
    const navigator = useNavigation<ResultsNavigationProp>();
    const placement = playerData.placement;
    const placementString = getNumberOrdinal(placement);

    const containerStyle = {
        ...styles.container,
        borderColor: colors.border,
        backgroundColor: colors.card,
    }

    // If the event is singles
    if (playerData.player) {
        const player = playerData.player;
        const user = player.user;
        const images = player.user?.images?.filter(truthyFilter) ?? []

        const profileImage = getImageByType(images, "any")

        const showUserProfile = () => {
            if (user?.id) {
                navigator.push("Profile", { id: user.id })
            }
        }

        return (
            <TouchableOpacity onPress={showUserProfile} activeOpacity={0.75}>
                <View style={containerStyle}>
                    <View style={styles.imageContainer}>
                        <PlaceholderImage imageSrc={profileImage.url} placeholder='player' style={styles.image} />
                    </View>
                    <View style={styles.detailsContainer}>
                        <View style={styles.playerTitle}>
                            <MainText style={styles.playerTag}>{player.gamerTag}</MainText>
                            {player.prefix && <SubtitleText style={styles.playerSponsor}>{player.prefix}</SubtitleText>}
                            {user !== null && user.genderPronoun && <SubtitleText style={styles.playerPronoun}>{user.genderPronoun}</SubtitleText>}
                        </View>
                        <MainText style={styles.playerPlacement}>{placementString}</MainText>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    // Teams (not singles) events
    const entrant = playerData.entrant!;
    const participants = entrant.participants?.filter(truthyFilter) ?? [];
    const images = getImagesFromParticipants(participants);


    return (
        <View style={containerStyle}>
            <View style={styles.imageContainer}>
                <PlaceholderImage imageSrc={images[0]} placeholder="player" style={styles.image} />
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.playerTitle}>
                    <MainText style={styles.playerTag}>{entrant.name}</MainText>
                </View>
                <MainText style={styles.playerPlacement}>{placementString}</MainText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // marginBottom: 10,
        borderWidth: 1,
        borderStyle: 'solid'
    },
    imageContainer: {
        height: 100,
        width: 100,
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    detailsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    playerTitle: {
        marginLeft: 5
    },
    playerTag: {
        fontWeight: 'bold',
        fontSize: 18,
        flexWrap: 'wrap',
        flexShrink: 1
    },
    playerSponsor: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    playerPronoun: {
        fontSize: 15
    },
    playerPlacement: {
        marginLeft: 'auto',
        marginRight: 20,
        fontWeight: '700',
        fontSize: 20
    }
});

export default ResultCard;
