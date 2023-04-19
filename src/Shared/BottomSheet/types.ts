import { StyleProp, ViewStyle } from "react-native";

export interface BottomSheetProps {

    children?: React.ReactNode
    style?: StyleProp<ViewStyle>
}

export interface BottomSheetRefProps {
    scrollTo: (destination: number) => void
    isActive: () => boolean
}
