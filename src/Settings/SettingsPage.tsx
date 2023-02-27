import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import SettingsDropdown from "./SettingsDropdown";
import SettingsSwitch from "./SettingsSwitch";

import GameOptions from "./games.json";

const SettingsPage = ({ navigation, route }) => {

    const { colors } = useTheme()

    return (
        <View style={styles.container}>
            <SettingsSwitch title="Debug" setting="debug" />
            <SettingsDropdown data={GameOptions} setting="mainGame" title="Main Game" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    }
});

export default SettingsPage;
