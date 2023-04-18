import { useTheme } from "@react-navigation/native";
import { StyleProp, Text, TextInput, TextInputProps, TextProps, TextStyle } from "react-native";

export function MainText(props: TextProps) {
    const { colors } = useTheme();

    const newProps = Object.assign({}, props);
    const colorText: StyleProp<TextStyle> = {
        color: colors.text
    }
    newProps.style = [props.style, colorText]

    return <Text {...newProps} />
}

export function SubtitleText(props: TextProps) {
    const { colors } = useTheme();

    const newProps = Object.assign({}, props);
    const colorText: StyleProp<TextStyle> = {
        color: colors.secondaryText
    }
    newProps.style = [props.style, colorText]

    return <Text {...newProps} />
}

export function LinkText(props: TextProps) {
    const { colors } = useTheme();

    const newProps = Object.assign({}, props);
    newProps.style = [props.style, { color: colors.link }];

    return <Text {...newProps} />
}

export function AccentText(props: TextProps) {
    const { colors } = useTheme();

    const newProps = Object.assign({}, props);
    newProps.style = [props.style, { color: colors.primary }];

    return <Text {...newProps} />
}

export function ThemedTextInput(props: TextInputProps) {
    const { colors } = useTheme();

    const newProps = Object.assign({}, props);
    newProps.style = [props.style, { color: colors.text }]

    return <TextInput {...newProps} />
}
