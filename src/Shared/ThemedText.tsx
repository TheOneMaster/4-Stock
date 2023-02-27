import { useTheme } from "@react-navigation/native";
import { Text, TextProps } from "react-native";

export function MainText(props: TextProps) {
    const { colors } = useTheme();
    const propStyle = props.style;

    delete props.style;

    return <Text style={[{ color: colors.text }, propStyle]} {...props}>{props.children}</Text>
}

export function SubtitleText(props: TextProps) {
    const { colors } = useTheme();
    const propStyle = props.style;

    delete props.style;

    return <Text style={[{ color: colors.secondaryText }, propStyle]} {...props}>{props.children}</Text>
}
