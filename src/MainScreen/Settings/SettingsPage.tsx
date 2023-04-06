import { StyleSheet, View, ScrollView } from "react-native";

import { SettingsViewProps } from "../../navTypes";
import SettingsGroup from "./SettingsGroup";
import { SettingsDropdown, SettingsSwitch, SettingsTextInput } from "./SettingsItems";
import GAME_LIST from "./games.json"


const SettingsPage = ({ navigation, route }: SettingsViewProps) => {

    return (
        <ScrollView style={styles.container}>

            <SettingsGroup title="General">
                <SettingsTextInput group="general" setting="apiKey" title="API Key" style={{ paddingVertical: 0, paddingHorizontal: 10 }} hidden />
                <SettingsDropdown data={GAME_LIST} group="general" setting="mainGame" title="Main Game" style={{ paddingHorizontal: 10 }} />
                <SettingsSwitch group="general" setting="debug" title="Debug" style={{ paddingHorizontal: 10, paddingTop: 5, paddingBottom: 8 }} />
            </SettingsGroup>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default SettingsPage;
