import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import PlaceholderImage from "../PlaceholderImage";

export const TopBar = (props) => {

    const { colors } = useTheme();

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


    const styles = StyleSheet.create({
        container: {},
        profile_only_view: {
            paddingVertical: 10
        },

        banner_container: {
            height: 200,
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderColor: colors.border,
        },
        banner_image: {
            flex: 1,
            resizeMode: "cover",
        },

        profile_container: {
            height: 80,
            position: "relative",
            marginHorizontal: 20,
            flexDirection: "row",
        },
        profile_image_container: {
            borderWidth: 1,
            borderColor: colors.border,
            borderStyle: 'solid',
            borderRadius: 10,
            overflow: 'hidden',
            width: 80,
            backgroundColor: colors.background
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
            color: colors.text
        },
    });

    // If banner image is provided
    if (Object.keys(banner_image).length !== 0) {
        return (
            <View style={styles.container}>
                <View style={styles.banner_container}>
                    <Image source={{ uri: banner_image.url }} style={styles.banner_image}></Image>
                </View>

                <View style={{ ...styles.profile_container, marginTop: -20 }}>
                    <View style={styles.profile_image_container}>
                        <PlaceholderImage imageSrc={profile_image.url} style={styles.profile_image}/>
                    </View>
                    <View style={{ ...styles.profile_text, marginTop: 20 }}>
                        <Text style={styles.profile_title} adjustsFontSizeToFit={true} numberOfLines={3}>{props.name}</Text>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.profile_only_view}>
            <View style={styles.profile_container}>
                <View style={styles.profile_image_container}>
                    <PlaceholderImage imageSrc={profile_image.url} style={styles.profile_image}/>
                </View>
                <View style={{ ...styles.profile_text, justifyContent: 'center' }}>
                    <Text style={styles.profile_title}>{props.name}</Text>
                </View>
            </View>
        </View>
    );


};
