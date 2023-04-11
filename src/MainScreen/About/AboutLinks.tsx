import { useTheme } from "@react-navigation/native";
import { Linking, Pressable, StyleSheet, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinkProps } from "./types";


function AboutLinks() {
    return (
        <View style={styles.linkContainer}>
            <Link icon="logo-github" linkUrl="https://github.com/TheOneMaster/StartGGApp" />
        </View>
    )
}



function Link(props: LinkProps) {

    const openLink = () => Linking.openURL(props.linkUrl);
    const { colors } = useTheme();

    return (
        <Pressable onPress={openLink} style={styles.container}>
            <Ionicons name={props.icon} size={30} color={colors.primary} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    linkContainer: {
        flexDirection: "row"
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
});

export default AboutLinks;
