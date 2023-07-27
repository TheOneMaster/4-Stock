import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { TopBarProps } from "./types";
import { FavIcon, TransparentCard, PlaceholderImage, getImageByType } from "../Shared";
import { TitleText } from "../Shared/Text";
import { BackIcon } from "../Shared/BackIcon";
import { truthyFilter } from "../helper";


type MenuOptionsProps = {
    fav?: boolean
    favPress?: () => void
    iconSize?: number
    style?: StyleProp<ViewStyle>
}

function MenuOptions(props: MenuOptionsProps) {
    const iconSize = props.iconSize ?? 25;
    const backSize = 20;

    return (
        <View style={[styles.menu, props.style]}>
            <BackIcon size={backSize} />
            <View style={styles.menuRight}>
                <FavIcon favourite={props.fav} onPress={props.favPress} size={iconSize} />
            </View>
        </View>
    )
}


export const TopBar = (props: TopBarProps) => {
    const images = props.images?.filter(truthyFilter) ?? [];
    const bannerImage = getImageByType(images, "banner");
    const profileImage = getImageByType(images, "profile");

    // If banner image is provided
    if (bannerImage.url) {
        return (
            <View style={styles.container}>

                <TransparentCard style={styles.banner_container}>
                    <PlaceholderImage imageSrc={bannerImage.url} style={styles.banner_image} resize="stretch" />
                    <MenuOptions fav={props.fav} favPress={props.favFunc} style={styles.floatingMenu} />
                </TransparentCard>

                <View style={[styles.profile_container, { marginTop: -20 }]}>

                    <TransparentCard style={styles.profile_image_container}>
                        <PlaceholderImage imageSrc={profileImage.url} style={styles.profile_image} />
                    </TransparentCard>

                    <View style={[styles.profile_text, { marginTop: 20 }]}>
                        <TitleText style={styles.profile_title} adjustsFontSizeToFit={true} numberOfLines={3}>{props.name}</TitleText>
                    </View>

                </View>
            </View>
        );
    }

    return (
        <View style={styles.profile_only_view}>

            <MenuOptions fav={props.fav} favPress={props.favFunc} />

            <View style={styles.profile_container}>
                <View style={styles.profile_image_container}>
                    <PlaceholderImage imageSrc={profileImage.url} style={styles.profile_image} />
                </View>
                <View style={[styles.profile_text, { justifyContent: "center" }]}>
                    <TitleText style={styles.profile_title} adjustsFontSizeToFit={true} numberOfLines={3}>{props.name}</TitleText>
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
        borderBottomWidth: 2,
        borderStyle: 'solid',
    },
    banner_image: {
        height: "100%",
        zIndex: 1
    },
    profile_container: {
        height: 80,
        position: "relative",
        marginHorizontal: 20,
        flexDirection: "row",
        // backgroundColor: "rgba(0, 255, 0, 0.3)"
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
        flexWrap: 'wrap',
        flexShrink: 1,
        fontSize: 25
    },
    favIcon: {
        position: "absolute",
        right: 10,
        top: 10,
        zIndex: 2
    },
    backIcon: {
        position: "absolute",
    },
    menu: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        padding: 10,
        zIndex: 2,
    },
    menuRight: {
        marginLeft: "auto",
    },
    floatingMenu: {
        position: "absolute",
    }
})
