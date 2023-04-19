import { StyleProp, ViewStyle } from "react-native"

export interface FilterButtonProps {
    onPress: () => void
    style?: StyleProp<ViewStyle>
}

export interface FilterButtonRefProps {
    toggleFilter: (active: boolean) => void
}
