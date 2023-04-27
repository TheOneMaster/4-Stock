import { GestureResponderEvent, Insets, StyleProp, ViewProps, ViewStyle } from "react-native"

export interface BaseCardProps extends ViewProps {
    touchable?: boolean
}

export interface StaticCardProps extends BaseCardProps {
    touchable?: false
}

export interface TouchableCardProps extends BaseCardProps {
    touchable: true
    highlight?: boolean
    onPress?: (event?: GestureResponderEvent) => void
    hitslop?: number | Insets | null,
    activeColor?: string
    activeOpacity?: number
}


export type CardProps = (TouchableCardProps | StaticCardProps);
