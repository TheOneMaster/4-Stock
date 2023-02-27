import { useTheme } from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";
import PlaceholderImage from "../Shared/PlaceholderImage";
import { MainText } from "../Shared/ThemedText";

export const TopBar = (props) => {

    const theme = useTheme();
    const colors = theme.colors;

    const banner_image = props.images.reduce((prev, cur) => {
        if (cur.type === "banner") {
            return cur;
        }
        return prev;
    }, {});
    const profile_image = props.images.reduce((prev, cur) => {
        if (cur.type === "profile") {
            return cur;
        }
        return prev;
    }, {});

    const imgBackgroundColor = theme.dark ? '#FFF' : "#000";

    const colorCSS = StyleSheet.create({
        banner_container: {
            borderColor: colors.border
        },
        profile_image_container: {
            borderColor: colors.border,
            backgroundColor: imgBackgroundColor
        }
    })

    // If banner image is provided
    if (Object.keys(banner_image).length !== 0) {
        return (
            <View style={styles.container}>
                <View style={[styles.banner_container, colorCSS.banner_container]}>
                    <Image source={{ uri: banner_image.url }} style={styles.banner_image}></Image>
                </View>

                <View style={{ ...styles.profile_container, marginTop: -20 }}>
                    <View style={[styles.profile_image_container, colorCSS.profile_image_container]}>
                        <PlaceholderImage imageSrc={profile_image.url} style={styles.profile_image} />
                    </View>
                    <View style={{ ...styles.profile_text, marginTop: 20 }}>
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
                    <PlaceholderImage imageSrc={profile_image.url} style={styles.profile_image} />
                </View>
                <View style={{ ...styles.profile_text, justifyContent: 'center' }}>
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
