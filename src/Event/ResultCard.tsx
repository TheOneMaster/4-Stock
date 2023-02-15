import { StyleSheet, View, Text } from "react-native"
import { useTheme } from "@react-navigation/native"

import { ImageType } from "../types";
import PlaceholderImage from "../Shared/PlaceholderImage";

function getProfileImageUrl(user): string {
    let profileImage = '';
    try {
        const images: ImageType[] = user.images;
        profileImage = images.reduce((prev, cur) => {
            if (cur.type === 'profile') {
                return cur.url
            }
            return prev
        }, '');
    } catch(err) {
        
    }

    return profileImage;
}


const ResultCard = ({playerData, index}) => {

    const { colors } = useTheme();
    const placement = playerData.placement;

    const player = playerData.player;
    const user = player.user;
    const profileImage = getProfileImageUrl(user);

    const containerStyle = {
        ...styles.container,
        borderColor: colors.border,
        backgroundColor: colors.card,
        marginTop: index === 0 ? 10 : undefined
    }

    const playerTitle = player.prefix ? `${player.prefix} | ${player.gamerTag}` : player.gamerTag;

    return (
        <View style={containerStyle}>
            <View style={styles.imageContainer}>
                <PlaceholderImage imageSrc={profileImage} placeholder='player' style={{height: 100, width: 100}}/>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.playerTitle}>
                    <Text style={{...styles.playerTag, color: colors.text}}>{player.gamerTag}</Text>
                    { player.prefix && <Text style={{...styles.playerSponsor, color: colors.secondaryText}}>{player.prefix}</Text> }
                    { user.genderPronoun && <Text style={{...styles.playerPronoun, color: colors.secondaryText}}>{user.genderPronoun}</Text>}
                </View>
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
