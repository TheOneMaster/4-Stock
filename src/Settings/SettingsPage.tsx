import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import SettingsDropdown from "./SettingsDropdown";
import SettingsSwitch from "./SettingsSwitch";

const SettingsPage = ({ navigation, route }) => {

    const { colors } = useTheme()
    const [selected, setSelected] = useState([])

    const test_data = [
        { label: "Test 1", value: 1 },
        { label: "Test 2", value: 2 }
    ]

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <SettingsSwitch title="Debug" setting="debug" />
            <SettingsDropdown data={test_data} setting="mainGame" title="Main Game"></SettingsDropdown>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 10
    }
});

export default SettingsPage;
