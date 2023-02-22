import { Switch, Text, View } from "react-native";
import { SettingsProps } from "./types";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { SettingsItemStyles } from "./types";


const SettingsSwitch = ({ title, setting, style }: SettingsProps) => {

    const [active, setActive] = useState(false);
    const { colors } = useTheme();


    function toggleSwitch(state) {
        setActive(state);
        console.log(state);
    }

    return (
        <View style={[SettingsItemStyles.container, { borderColor: colors.border }, style]}>
            <Text style={[SettingsItemStyles.title, { color: colors.text }]}>{title}</Text>
            <View style={SettingsItemStyles.componentContainer}>
                <Switch value={active} onValueChange={toggleSwitch} />
            </View>

        </View>
    )
}

export default SettingsSwitch;
