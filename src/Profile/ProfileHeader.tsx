import { useTheme } from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";
import { getImageByType } from "../Shared/APIConverters";

import PlaceholderImage from "../Shared/PlaceholderImage";
import { Location } from "../Shared/SVG";
import { MainText, SubtitleText } from "../Shared/ThemedText";
import { User } from "../types";

interface ProfileHeaderProps {
    profileDetails: User
}


function ProfileHeader(props: ProfileHeaderProps) {

    const profileImageUrl = getImageByType(props.profileDetails.images, "profile");
    const bannerImageUrl = getImageByType(props.profileDetails.images, "banner");

    const locationString = props.profileDetails.location.state ? `${props.profileDetails.location.state}, ${props.profileDetails.location.country}` : props.profileDetails.location.country;

    const { colors } = useTheme();
    const colorCSS = StyleSheet.create({
        profileImageBox: {
            borderColor: colors.border
        }
    })

    if (bannerImageUrl) return (
        <View>
            {bannerImageUrl
                ? <View style={bannerStyles.bannerImageBox}>
                    <Image source={{ uri: bannerImageUrl.url }} style={bannerStyles.bannerImage} />
                </View>
                : null
            }

            <View style={[styles.container, bannerStyles.container]}>

                <View style={[styles.profileImageBox, colorCSS.profileImageBox]}>
                    <PlaceholderImage placeholder="player" imageSrc={profileImageUrl.url} style={styles.profileImage} />
                </View>

                <View style={[styles.profileInfo, bannerStyles.profileInfo]}>

                    <View style={styles.profileNames}>
                        <MainText style={styles.profileName}>{props.profileDetails.player.gamerTag}</MainText>
                        {props.profileDetails.player.user.name && <SubtitleText>{props.profileDetails.player.user.name}</SubtitleText>}
                    </View>

                    <View style={styles.profileDetails}>
                        {props.profileDetails.location.country
                            ? <View style={styles.profileLocation}>
                                <Location height={13} width={13} color={colors.secondaryText} style={{ marginRight: 5 }} />
                                <SubtitleText>{locationString}</SubtitleText>
                            </View>
                            : null
                        }
                    </View>
                </View>

            </View>
        </View>
    )

    return (

        <View style={[styles.container, { marginTop: 10 }]}>

            <View style={[styles.profileImageBox, colorCSS.profileImageBox]}>
                <PlaceholderImage placeholder="player" imageSrc={profileImageUrl.url} style={styles.profileImage} />
            </View>

            <View style={styles.profileInfo}>

                <View style={styles.profileNames}>
                    <MainText style={styles.profileName}>{props.profileDetails.player.gamerTag}</MainText>
                    {props.profileDetails.player.user.name && <SubtitleText>{props.profileDetails.player.user.name}</SubtitleText>}
                </View>

                <View style={styles.profileDetails}>
                    {props.profileDetails.location.country
                        ? <View style={styles.profileLocation}>
                            <Location height={13} width={13} color={colors.secondaryText} style={{ marginRight: 5 }} />
                            <SubtitleText>{locationString}</SubtitleText>
                        </View>
                        : null
                    }
                </View>
            </View>

        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginLeft: 10,
    },
    profileDetails: {
        marginTop: "auto",
        marginBottom: 5
    },
    profileInfo: {
        marginLeft: 10,
    },
    profileNames: {
        marginTop: "auto",
        marginBottom: "auto",
        paddingVertical: 5
    },
    profileName: {
        fontSize: 17,
        fontWeight: '500',
    },
    profileImageBox: {
        height: 100,
        width: 100,
        borderRadius: 20,
        overflow: "hidden",
        borderWidth: 2,
        borderStyle: "solid"
    },
    profileImage: {
        width: "100%",
        height: "100%"
    },
    profileLocation: {
        flexDirection: "row",
        alignItems: "center"
    }
});

const bannerStyles = StyleSheet.create({
    container: {
        top: -20
    },
    bannerImage: {
        flex: 1,
        resizeMode: "cover"
    },
    bannerImageBox: {
        flexGrow: 1,
        height: 120,
        backgroundColor: "grey"
    },
    profileInfo: {
        marginTop: 20
    }
})

export default ProfileHeader;
