import { StyleSheet, View } from "react-native";

import AboutInfo from "./AboutInfo";
import AboutLinks from "./AboutLinks";


function AboutPage() {
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
