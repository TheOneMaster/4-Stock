import { useTheme } from "@react-navigation/native";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons"

import { AntDesignThemedProps, FontAwesomeThemedProps, IoniconsThemedProps } from "./types"

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
