import React from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface BottomSheetProps {
    setOverlay?: React.Dispatch<React.SetStateAction<boolean>>

    children?: React.ReactNode
    style?: StyleProp<ViewStyle>
}

export interface BottomSheetRefProps {
    scrollTo: (destination: number) => void
    isActive: () => boolean
}
