import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

import PlaceholderImage from "../Shared/PlaceholderImage";
import { Location } from "../Shared/SVG";
import { MainText, SubtitleText } from "../Shared/ThemedText";
import { ImageType, User } from "../types";

interface ProfileHeaderProps {
    profileDetails: User
}

function getProfileImage(images: ImageType[]): string {
    return images.reduce((prev, cur) => {
        if (cur.type === "profile") {
            return cur.url
        }
        return prev
    }, "")
}

function ProfileHeader(props: ProfileHeaderProps) {

    const profileImageUrl = getProfileImage(props.profileDetails.images);
    const locationString = props.profileDetails.location.state ? `${props.profileDetails.location.state}, ${props.profileDetails.location.country}` : props.profileDetails.location.country;

    const { colors } = useTheme();
    const colorCSS = StyleSheet.create({
        profileImageBox: {
            borderColor: colors.border
        }
    })

    return (
        <View style={styles.container}>

            <View style={[styles.profileImageBox, colorCSS.profileImageBox]}>
                <PlaceholderImage placeholder="player" imageSrc={profileImageUrl} style={styles.profileImage} />
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
        flexDirection: "row"
    },
    profileDetails: {
        marginTop: "auto",
        marginBottom: 5
    },
    profileInfo: {
        marginLeft: 10
    },
    profileNames: {
        marginTop: "auto",
        marginBottom: "auto",
        // backgroundColor: "blue",
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

export default ProfileHeader;
