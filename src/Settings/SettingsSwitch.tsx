import { Switch, Text, View } from "react-native";
import { SettingsProps } from "./types";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { SettingsItemStyles } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SettingsSwitch = ({ title, setting, style }: SettingsProps) => {

    const [active, setActive] = useState(false);
    const mounted = useRef(false);
    const { colors } = useTheme();

    useEffect(() => {
        // Keep state hook and storage in sync
        if (!mounted) {
            AsyncStorage.getItem(setting).then((value) => {
                if (value === null) {
                    return
                }
                const valueBool = value === "true";
                setActive(valueBool);
                mounted.current = true;
            }).catch((err) => { return })
        }
        AsyncStorage.setItem(setting, active.toString());
    }, [active])

    function toggleSwitch(state) {
        setActive(state);
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
