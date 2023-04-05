import { useTheme } from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";

import { ProfileHeaderProps } from "./types";
import { getImageByType, PlaceholderImage } from "../Shared";
import UserInfoSection from "./UserInfoSection";




function ProfileHeader(props: ProfileHeaderProps) {
    const images = props.profileDetails.images?.flatMap(image => image ? [image] : []) ?? [];
    const profileImageUrl = getImageByType(images, "profile");
    const bannerImageUrl = getImageByType(images, "banner");

    const { colors } = useTheme();
    const colorCSS = StyleSheet.create({
        profileImageBox: {
            borderColor: colors.border
        }
    })

    if (bannerImageUrl.url) return (
        <View>

            <View style={bannerStyles.bannerImageBox}>
                <Image source={{ uri: bannerImageUrl.url }} style={bannerStyles.bannerImage} />
            </View>

            <View style={[styles.container, bannerStyles.container]}>

                <View style={[styles.profileImageBox, colorCSS.profileImageBox]}>
                    <PlaceholderImage placeholder="player" imageSrc={profileImageUrl.url} style={styles.profileImage} />
                </View>

                <UserInfoSection
                    player={props.profileDetails.player}
                    genderPronoun={props.profileDetails.genderPronoun}
                    location={props.profileDetails.location}
                    style={bannerStyles.profileInfo}
                />

            </View>
        </View>
    )

    return (
        <View style={[styles.container]}>

            <View style={[styles.profileImageBox, colorCSS.profileImageBox]}>
                <PlaceholderImage placeholder="player" imageSrc={profileImageUrl.url} style={styles.profileImage} />
            </View>

            <UserInfoSection
                player={props.profileDetails.player}
                genderPronoun={props.profileDetails.genderPronoun}
                location={props.profileDetails.location}
            />

        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginLeft: 10,
        marginTop: 10,
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
    }
});

const bannerStyles = StyleSheet.create({
    container: {
        top: -20,
        marginTop: 0
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
        marginTop: 20,
    }
})

export default ProfileHeader;
