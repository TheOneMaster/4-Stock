import { useTheme } from "@react-navigation/native";
import { Ionicons, FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons"
import { ComponentProps } from "react";
import { Icon } from "@expo/vector-icons/build/createIconSet"

type TextTypes = "primary" | "secondary";
type Text = { text?: TextTypes }

export type IoniconsThemedProps = ComponentProps<typeof Ionicons> & Text
export type FontAwesomeThemedProps = ComponentProps<typeof FontAwesome> & Text
export type AntDesignThemedProps = ComponentProps<typeof AntDesign> & Text
export type MaterialIconsThemedProps = ComponentProps<typeof MaterialIcons> & Text



export function IoniconsThemed(props: IoniconsThemedProps) {
    const { colors } = useTheme();
    return <Ionicons {...props} color={props.text === "secondary" ? colors.secondaryText : colors.text} />
}

export function FontAwesomeThemed(props: FontAwesomeThemedProps) {
    const { colors } = useTheme();
    return <FontAwesome {...props} color={props.text === "secondary" ? colors.secondaryText : colors.text} />
}

export function AntDesignThemed(props: AntDesignThemedProps) {
    const { colors } = useTheme();
    return <AntDesign {...props} color={props.text === "secondary" ? colors.secondaryText : colors.text} />
}

export function MaterialIconsThemed(props: MaterialIconsThemedProps) {
    const { colors } = useTheme();
    return <MaterialIcons {...props} color={props.text === 'secondary' ? colors.secondaryText : colors.text} />
}
