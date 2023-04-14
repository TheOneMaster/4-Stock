import { StyleProp, ViewStyle } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export interface DropdownOption {
    label: string,
    value: number
}

export interface AppSettings {
    general: {
        debug: boolean
        mainGame: DropdownOption | null
        apiKey: string
    },
    theme: {
        baseCol: string
    }
}

export interface SettingsItem<Group extends keyof AppSettings> {
    title: string
    group: Group
    setting: keyof AppSettings[Group]
    iconName?: keyof typeof Ionicons.glyphMap
    style?: StyleProp<ViewStyle>
}

export interface SettingsTextInputProps<Group extends keyof AppSettings> extends SettingsItem<Group> {
    group: Group
    setting: keyof AppSettings[Group]
    hidden?: boolean
}

export interface SettingsDropdownProps<Group extends keyof AppSettings> extends SettingsItem<Group> {
    data: DropdownOption[]
}

export interface DropdownItemProps {
    item: DropdownOption
    onPress: (item: DropdownOption) => void
    active?: boolean
}

export interface DropdownItemListProps {
    data: DropdownOption[]
    activeValue: number
    onPress: (item: DropdownOption) => void
    style?: StyleProp<ViewStyle>
}

export interface TitleBarProps {
    title: string
    iconName?: keyof typeof Ionicons.glyphMap
    style?: StyleProp<ViewStyle>
}
