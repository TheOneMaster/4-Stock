import { ScrollView, StyleSheet } from "react-native";

import { SettingsViewProps } from "../../navTypes";
import GAME_LIST from "./games.json";
import SettingsGroup from "./SettingsGroup";
import { SettingsDropdown, SettingsSwitch, SettingsTextInput } from "./SettingsItems";


const SettingsPage = ({ navigation, route }: SettingsViewProps) => {

    return (
        <ScrollView style={styles.container}>

            <SettingsGroup title="General">
                <SettingsTextInput group="general" setting="apiKey" title="API Key" style={[styles.settingsItem, styles.textInput]} hidden />
                <SettingsDropdown data={GAME_LIST} group="general" setting="mainGame" title="Main Game" style={styles.settingsItem} />
                <SettingsSwitch group="general" setting="debug" title="Debug" style={[styles.settingsItem, styles.switch]} />
            </SettingsGroup>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    settingsItem: {
        paddingHorizontal: 10,
    },
    textInput: {
        paddingVertical: 0
    },
    switch: {
        paddingTop: 5,
        paddingBottom: 8
    }
});

export default SettingsPage;
