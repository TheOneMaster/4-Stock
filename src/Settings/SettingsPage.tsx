import { StyleSheet, View } from "react-native";

import { SettingsViewProps } from "../navTypes";
import SettingsGroup from "./SettingsGroup";
import { SettingsDropdown, SettingsSwitch, SettingsTextInput } from "./SettingsItems";
import GAME_LIST from "./games.json"


const SettingsPage = ({ navigation, route }: SettingsViewProps) => {

    return (
        <View style={styles.container}>
            {/* <SettingsSwitch title="Debug" setting="general.debug" /> */}
            {/* <SettingsDropdown data={GameOptions} setting="general.mainGame" title="Main Game" /> */}

            <SettingsGroup title="General">
                <SettingsTextInput group="general" setting="apiKey" title="API Key" hidden style={{paddingVertical: 0}} />
                <SettingsDropdown data={GAME_LIST} group="general" setting="mainGame" title="Main Game" />
                <SettingsSwitch group="general" setting="debug" title="Debug" />
            </SettingsGroup>

            {/* <SettingsGroup title="Theming">
                
            </SettingsGroup> */}


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default SettingsPage;
