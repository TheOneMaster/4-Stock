import { Text, TextProps } from "react-native";
import { useTheme } from "@react-navigation/native";

export function MainText(props: TextProps) {
    const { colors } = useTheme();
    const propStyle = props.style;
    const children = props.children;

    delete props.style;
    delete props.children;

    return <Text style={[{color: colors.text}, propStyle]} {...props}>{children}</Text>
}

export function SubtitleText(props: TextProps) {
    const {colors} = useTheme();
    const propStyle = props.style;
    const children = props.children;

    delete props.style;
    delete props.children;

    return <Text style={[{color: colors.secondaryText}, propStyle]} {...props}>{children}</Text>
}
