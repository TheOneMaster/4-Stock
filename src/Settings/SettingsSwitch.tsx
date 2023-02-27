import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Switch, View } from "react-native";
import { MainText } from "../Shared/ThemedText";
import { SettingsItemStyles, SettingsProps } from "./types";


const SettingsSwitch = ({ title, setting, style }: SettingsProps) => {

    const [active, setActive] = useState(false);
    const mounted = useRef(false);
    const { colors } = useTheme();

    async function initialSetup() {
        const value = await AsyncStorage.getItem(setting);

        if (value === null) {
            return
        }

        const valueBool = value === "true";

        setActive(valueBool);
        mounted.current = true
    }

    useEffect(() => {
        // Keep state hook and storage in sync
        if (!mounted.current) {
            initialSetup();
        }
        AsyncStorage.setItem(setting, active.toString());
    }, [active])

    function toggleSwitch(state) {
        setActive(state);
    }

    return (
        <View style={[SettingsItemStyles.container, { borderColor: colors.border }, style]}>
            <MainText style={SettingsItemStyles.title}>{title}</MainText>
            <View style={SettingsItemStyles.componentContainer}>
                <Switch value={active} onValueChange={toggleSwitch} />
            </View>

        </View>
    )
}

export default SettingsSwitch;
