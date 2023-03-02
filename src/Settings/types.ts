import React from "react"
import { StyleProp, StyleSheet, ViewStyle } from "react-native"

export interface DropdownOption {
    label: string,
    value: number
}

export interface SettingsProps {
    title: string,
    setting: keyof AppSettings,
    style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[]
}

export interface SettingsSwitchProps extends SettingsProps {
    setting: KeysMatching<AppSettings, boolean>
}

export interface SettingsDropdownProps extends SettingsProps {
    data: DropdownOption[]
    setting: KeysMatching<AppSettings, DropdownOption>
    value?: number
    backgroundColor?: string
}

export interface DropdownItemProps {
    item: DropdownOption
    active: boolean
    setting: KeysMatching<AppSettings, DropdownOption>
    selectItem: React.Dispatch<React.SetStateAction<DropdownOption>>
    setDrawerState: React.Dispatch<React.SetStateAction<boolean>>
}

export const SettingsItemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        minHeight: 60,

        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    componentContainer: {
        marginLeft: 'auto'
    }
})

export interface AppSettings {
    "general.debug": boolean,
    "general.mainGame": DropdownOption
}

type KeysMatching<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];
