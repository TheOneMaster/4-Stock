import React from "react";
import { StyleProp, ViewProps, ViewStyle } from "react-native";

export interface BottomSheetProps extends ViewProps {
    maxSize?: number
    minSize?: number
    setOverlay?: React.Dispatch<React.SetStateAction<boolean>>
}

export interface BottomSheetRefProps {
    scrollTo: (destination: number) => void
    isActive: () => boolean
}
