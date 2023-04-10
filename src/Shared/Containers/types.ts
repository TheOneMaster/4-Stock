import { GestureResponderEvent, Insets, StyleProp, ViewStyle } from "react-native"

export interface BaseCardProps {
    touchable?: boolean
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode
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
