import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";
import { useMMKVBoolean, useMMKVString, useMMKVObject } from "react-native-mmkv";
import { AppSettings, SettingsItemStyles, SettingsProps } from "./types";


const SettingsSwitch = ({ title, setting, style }: SettingsProps) => {
    const [settings, setSettings] = useMMKVObject<AppSettings>("settings");
    const [active, setActive] = useState(settings["general.debug"]);

    const [temp, setTemp] = useState(false)

    const { colors } = useTheme();



    useEffect(() => {
        console.log(temp);
        const newSettings = Object.assign({}, settings, { [setting]: temp });
        setSettings(newSettings)
    }, [temp])

    return (
        <View style={[SettingsItemStyles.container, { borderColor: colors.border }, style]}>
            <Text style={[SettingsItemStyles.title, { color: colors.text }]}>{title}</Text>
            <View style={SettingsItemStyles.componentContainer}>
                <Switch value={temp} onValueChange={setTemp} style={{ transform: [{ scale: 1.3 }] }} />
            </View>

        </View>
    )
}

export default SettingsSwitch;
