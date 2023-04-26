import { useTheme } from "@react-navigation/native";
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { FontFamily } from "../../Themes";


interface CustomTextProps extends TextProps {
    font?: FontFamily
    themed?: boolean
    primary?: boolean
}

export function CustomText(props: CustomTextProps) {
    const { colors } = useTheme();
    const { font, themed = true, primary = true, ...textProps } = props;

    let textColor: string | undefined = undefined;
    if (themed) textColor = primary ? colors.text : colors.secondaryText;

    const newStyle: StyleProp<TextStyle> = {
        fontFamily: props.font,
        color: textColor
    }

    const newProps = Object.assign({}, textProps);
    newProps.style = [newStyle, props.style];

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


// Fully themed text components
export function TitleText(props: TextProps) {
    const newProps = Object.assign({}, props);
    newProps.style = [styles.title, props.style];

    return <CustomText themed font="Rubik_bold" {...newProps} />
}

export function SubtitleText(props: TextProps) {
    return <CustomText themed primary={false} font="Anuphan" {...props} />
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18
    }
})
