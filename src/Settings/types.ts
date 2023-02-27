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

export interface SettingsDropdownProps extends SettingsProps {
    data: DropdownOption[],
    value?: number,
    backgroundColor?: string,
}

export const SettingsItemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        minHeight: 50,

        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    componentContainer: {
        marginLeft: 'auto'
    }
})

export interface AppSettings {
    debug: boolean,
    mainGame: DropdownOption
}
