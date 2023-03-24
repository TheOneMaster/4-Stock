import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

import { useMMKV } from "react-native-mmkv"

import SettingsDropdown from "./SettingsDropdown";
import SettingsSwitch from "./SettingsSwitch";


import GameOptions from "./games.json";
import { useEffect } from "react";
import { AppSettings } from "./types";
import { SettingsTextInput } from "./SettingsItems";


const SettingsPage = ({ navigation, route }) => {
    const { colors } = useTheme();
    const storage = useMMKV()
    useEffect(() => {

        if (storage.contains("settings")) {
            return
        }

        const DEFAULT_SETTINGS: AppSettings = {
            "general.debug": false,
            "general.mainGame": null
        }

        storage.set("settings", JSON.stringify(DEFAULT_SETTINGS));
    }, [])

    return (
        <View style={styles.container}>
            <SettingsSwitch title="Debug" setting="general.debug" />
            <SettingsDropdown data={GameOptions} setting="general.mainGame" title="Main Game" />
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
