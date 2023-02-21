import { StyleProp, ViewStyle } from "react-native"

export interface SettingsProps {
    title: string,
    setting?: string
}

export interface SettingsDropdownProps extends SettingsProps {
    data: DropdownOption[],
    value?: number,
    style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[]
}

export interface DropdownOption {
    id?: string,
    label: string,
    value: number
}
