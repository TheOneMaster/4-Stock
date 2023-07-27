import { ScrollView, StyleSheet } from "react-native";

import GAME_LIST from "./games.json";
import { SettingsDropdown, SettingsSwitch, SettingsTextInput } from "./SettingsComponents";
import SettingsGroup from "./SettingsGroup";

import { useSettings } from "../../Context";
import { SettingsViewProps } from "../../navTypes";

const IS_DEBUG = __DEV__;

function SettingsPage({ navigation, route }: SettingsViewProps) {

    const { settings, updateSetting } = useSettings();

    return (
        <ScrollView style={styles.container}>

            <SettingsGroup title="General">
                <SettingsTextInput title="API Key" icon="key-outline" value={settings.apiKey} updateValue={(v) => updateSetting("apiKey", v)} />
                <SettingsDropdown title="Main Game" icon="game-controller-outline" updateValue={(v) => updateSetting("mainGame", v)} value={settings.mainGame} options={GAME_LIST} />
                {IS_DEBUG && <SettingsSwitch title="Debug" icon="bug-outline" value={settings.debug} updateValue={(value) => updateSetting("debug", value)} />}
            </SettingsGroup>

        </ScrollView>
    );
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
