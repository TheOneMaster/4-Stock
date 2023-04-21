// import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { truthyFilter } from "../helper";

import { getImageByType, PlaceholderImage, TransparentCard } from "../Shared";
import { ProfileHeaderProps } from "./types";
import UserInfoSection from "./UserInfoSection";


function ProfileHeader(props: ProfileHeaderProps) {
    const images = props.profileDetails.images?.filter(truthyFilter) ?? [];
    const profileImage = getImageByType(images, "profile");
    const bannerImage = getImageByType(images, "banner");

    return (
        <View>

            {bannerImage.url
                ? <TransparentCard style={bannerStyles.bannerImageBox}>
                    <PlaceholderImage imageSrc={bannerImage.url} style={bannerStyles.bannerImage} />
                </TransparentCard>
                : null}


            <View style={bannerImage.url ? [styles.container, bannerStyles.container] : styles.container}>

                <TransparentCard style={styles.profileImageBox}>
                    <PlaceholderImage placeholder="player" imageSrc={profileImage.url} style={styles.profileImage} />
                </TransparentCard>

                <UserInfoSection
                    player={props.profileDetails.player}
                    genderPronoun={props.profileDetails.genderPronoun}
                    location={props.profileDetails.location}
                    style={bannerImage.url ? bannerStyles.profileInfo : undefined}
                />

            </View>

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
        width: "100%",
        height: "100%",
        resizeMode: "stretch"
    },
    bannerImageBox: {
        flexGrow: 1,
        height: 120,
        backgroundColor: "grey",
        borderBottomWidth: 2
    },
    profileInfo: {
        marginTop: 20,
    }
})

export default ProfileHeader;
