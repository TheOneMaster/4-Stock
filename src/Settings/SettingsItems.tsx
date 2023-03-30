import { useRef, useState } from "react";
import { NativeSyntheticEvent, StyleProp, StyleSheet, TextInputSubmitEditingEventData, View, ViewStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useMMKVString } from "react-native-mmkv";

import EyeTextInput from "../Shared/EyeTextInput/EyeTextInput";
import { MainText } from "../Shared/ThemedText";
import { AppSettings, CorrectGroup } from "./types";




interface SettingsItem {
    title: string
    group: keyof AppSettings
    setting: CorrectGroup<AppSettings, SettingsItem['group']>
}



function useSetting(group: SettingsItem['group'], setting: SettingsItem['setting']) {

}




export interface SettingsTextInputProps extends SettingsItem {
    hidden?: boolean
    style?: StyleProp<ViewStyle>
}

export function SettingsTextInput(props: SettingsTextInputProps) {

    const {
        title,
        group,
        setting,
        hidden,
        style
    } = props;

    const settingsString = useRef(`${group}.${setting}`);
    const [settingStore, updateSetting] = useMMKVString(settingsString.current);

    function handleSubmit(text: string) {
        console.log(text);
        updateSetting(text);
    }


    if (hidden) return (
        <View style={[styles.container, style]}>
            <MainText style={styles.titleText}>{title}</MainText>
            <View style={{ marginLeft: "auto", backgroundColor: "white" }}>
                <EyeTextInput defaultValue={settingStore} onSubmit={handleSubmit} />
            </View>
        </View>
    )

    return (
        <View>
            <MainText>{title}</MainText>
            <View style={{ marginLeft: "auto", backgroundColor: "white" }}>
                <TextInput
                    value={settingStore}
                // onSubmitEditing={handleSubmit}
                />
            </View>
        </View>
    )

}





const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 17
    },

})
