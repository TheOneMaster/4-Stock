import { StyleProp, ViewStyle } from "react-native"
import { Ionicons } from "@expo/vector-icons"

type FavIconProps = {
    favourite?: boolean
    size?: number
    onPress?: () => void
    style?: StyleProp<ViewStyle>
}

export function FavIcon(props: FavIconProps) {
    const iconName = props.favourite ? "heart-sharp" : "heart-outline";
    const iconColor = props.favourite ? "red" : "lightgrey";
    const iconSize = props.size ?? 16;

    return <Ionicons name={iconName} color={iconColor} size={iconSize} onPress={props.onPress} style={props.style} />
}
