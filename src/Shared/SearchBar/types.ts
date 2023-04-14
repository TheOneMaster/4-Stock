import { StyleProp, ViewStyle } from "react-native";

export interface SearchBarProps {
    filter: string | null
    filterAction: (filter: string) => void
    setFilter?: (filter: string) => void
    searchTitle?: string
    placeholder?: string
    style?: StyleProp<ViewStyle>
}

export interface SearchBarIconProps {
    selected: boolean
    onBackPress: () => void
}
