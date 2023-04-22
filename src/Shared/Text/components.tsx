import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import { Rubik_400Regular } from "@expo-google-fonts/rubik";
import { useTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

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

export function RobotoText(props: TextProps) {
    const newProps = Object.assign({}, props);
    newProps.style = [{ fontFamily: "roboto" }, props.style];

    return <Text {...newProps} />
}

export function AnuphanText(props: TextProps) {
    const newProps = Object.assign({}, props);
    newProps.style = [{ fontFamily: "Anuphan" }, props.style];

    return <Text {...newProps} />
}

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

    return <AnuphanText {...newProps} />
}


// Fully themed text components
export function TitleText(props: TextProps) {

    const { colors } = useTheme();

    const newProps = Object.assign({}, props);
    newProps.style = [{
        padding: 10,
        fontSize: 18,
        fontFamily: "Rubik",
        fontWeight: "bold",
        color: colors.text,
    }, props.style]

    return <Text {...newProps} />
}
