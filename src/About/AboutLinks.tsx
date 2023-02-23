import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import GitHubIcon from "../../assets/github.svg"


function AboutLinks() {

    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => Linking.openURL("https://github.com/TheOneMaster/StartGGApp")}>
                <GitHubIcon width={25} height={25} color={colors.primary} />
            </TouchableOpacity>
        </View>
    )


}
 
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10
    }
});

export default AboutLinks;
