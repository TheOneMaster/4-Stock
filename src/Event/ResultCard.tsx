import { StyleSheet, View, Text } from "react-native"
import { useTheme } from "@react-navigation/native"

import { ImageType } from "../types";
import PlaceholderImage from "../Shared/PlaceholderImage";

function getProfileImageUrl(participant): string {
    const images: ImageType[] = participant.user.images;
    const profileImage = images.reduce((prev, cur) => {
        if (cur.type === 'profile') {
            return cur.url
        }
        return prev
    }, '');

    return profileImage;
}


const ResultCard = ({playerData, index}) => {

    const { colors } = useTheme();
    const entrant = playerData.entrant;
    const participant = entrant.participants[0];
    const placement = playerData.placement;
    const profileImage = getProfileImageUrl(participant)

    const containerStyle = {
        ...styles.container,
        borderColor: colors.border,
        backgroundColor: colors.card,
        marginTop: index === 0 ? 10 : undefined
    }

    return (
        <View style={containerStyle}>
            <View style={styles.imageContainer}>
                <PlaceholderImage imageSrc={profileImage} placeholder='player' style={{height: 100, width: 100}}/>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={{...styles.playerTag, color: colors.text}}>{entrant.name}</Text>
                <Text style={{...styles.playerPlacement, color: colors.text}}>{placement}</Text>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1,
        borderStyle: 'solid'
    },
    imageContainer: {
        height: 100,
        width: 100,
    },
    detailsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    playerTag: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 18,
        flexWrap: 'wrap',
        flexShrink: 1
    },
    playerPlacement: {
        marginLeft: 'auto',
        marginRight: 20,
        fontWeight: '700',
        fontSize: 20
    }
});

export default ResultCard;
