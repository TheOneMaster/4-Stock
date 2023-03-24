import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";
import { useMMKVObject } from "react-native-mmkv";
import { AppSettings, SettingsItemStyles, SettingsSwitchProps } from "./types";


const SettingsSwitch = ({ title, setting, style }: SettingsSwitchProps) => {
    const [settings, setSettings] = useMMKVObject<AppSettings>("settings");
    const [active, setActive] = useState(settings[setting]);

    const { colors } = useTheme();

    useEffect(() => {
        const newSettings = Object.assign({}, settings, { [setting]: active });
        setSettings(newSettings)
    }, [active])

    return (
        <View style={[SettingsItemStyles.container, { borderColor: colors.border }, style]}>
            <MainText style={SettingsItemStyles.title}>{title}</MainText>
            <View style={SettingsItemStyles.componentContainer}>
                <Switch value={active} onValueChange={setActive} style={{ transform: [{ scale: 1.3 }] }} />
            </View>

        </View>
    )
}

export default SettingsSwitch;
