import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native";
import { ComponentProps } from "react";

type IoniconsThemedProps = ComponentProps<typeof Ionicons> & { text: "primary" | "secondary" }

export function IoniconsThemed(props: IoniconsThemedProps) {
    const { colors } = useTheme();
    return <Ionicons {...props} color={props.text === "primary" ? colors.text : colors.secondaryText} />
}
