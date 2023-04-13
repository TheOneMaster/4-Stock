import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"

import { IoniconsThemedProps } from "./types"

export function IoniconsThemed(props: IoniconsThemedProps) {
    const { colors } = useTheme();
    return <Ionicons {...props} color={props.text === "secondary" ? colors.secondaryText : colors.text} />
}
