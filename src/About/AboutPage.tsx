import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import AboutInfo from "./AboutInfo";
import AboutLinks from "./AboutLinks";

import { version } from "../../package.json"

function AboutPage() {

    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <AboutInfo />
            <AboutLinks />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

export default AboutPage;
