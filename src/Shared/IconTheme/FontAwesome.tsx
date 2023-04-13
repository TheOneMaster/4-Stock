import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { FontAwesomeThemedProps } from "./types";

export function FontAwesomeThemed(props: FontAwesomeThemedProps) {
    const { colors } = useTheme();
    return <FontAwesome {...props} color={props.text === "secondary" ? colors.secondaryText : colors.text} />
}
