import { Image, StyleSheet, View } from "react-native";
import { TransparentCard } from "../Shared";
import { getImageByType } from "../Shared/APIConverters";
import PlaceholderImage from "../Shared/PlaceholderImage";
import { MainText } from "../Shared/ThemedNativeElements";
import { TopBarProps } from "./types";

export const TopBar = (props: TopBarProps) => {

    const images = props.images?.flatMap(image => image ? [image] : []) ?? []
    const bannerImage = getImageByType(images, "banner");
    const profileImage = getImageByType(images, "profile");

    // If banner image is provided
    if (bannerImage.url) {
        return (
            <View style={styles.container}>

                <TransparentCard style={styles.banner_container}>
                    <Image source={{ uri: bannerImage.url }} style={styles.banner_image}></Image>
                </TransparentCard>

                <View style={[styles.profile_container, { marginTop: -20 }]}>

                    <TransparentCard style={styles.profile_image_container}>
                        <PlaceholderImage imageSrc={profileImage.url} style={styles.profile_image} />
                    </TransparentCard>

                    <View style={[styles.profile_text, { marginTop: 20 }]}>
                        <MainText style={styles.profile_title} adjustsFontSizeToFit={true} numberOfLines={3}>{props.name}</MainText>
                    </View>

                </View>
            </View>
        );
    }

    return (
        <View style={styles.profile_only_view}>
            <View style={styles.profile_container}>
                <View style={styles.profile_image_container}>
                    <PlaceholderImage imageSrc={profileImage.url} style={styles.profile_image} />
                </View>
                <View style={[styles.profile_text, { justifyContent: "center" }]}>
                    <MainText style={styles.profile_title} adjustsFontSizeToFit={true} numberOfLines={3}>{props.name}</MainText>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    profile_only_view: {
        paddingVertical: 10
    },
    banner_container: {
        height: 200,
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    banner_image: {
        flex: 1,
        resizeMode: "stretch",
    },
    profile_container: {
        height: 80,
        position: "relative",
        marginHorizontal: 20,
        flexDirection: "row",
    },
    profile_image_container: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        overflow: 'hidden',
        width: 80,
    },
    profile_image: {
        flex: 1,
        resizeMode: "cover",
        width: undefined,
        height: undefined
    },
    profile_text: {
        marginHorizontal: 10,
        flex: 1,
    },
    profile_title: {
        fontWeight: 'bold',
        fontSize: 20,
        flexWrap: 'wrap',
        flexShrink: 1,
    }
})
