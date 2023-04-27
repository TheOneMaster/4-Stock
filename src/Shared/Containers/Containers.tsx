import { useTheme } from "@react-navigation/native";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { CardProps, StaticCardProps, TouchableCardProps } from "./types";

export function PrimaryCard(props: CardProps) {

    const { style } = props;
    const { colors } = useTheme();

    const colorStyle: StyleProp<ViewStyle> = {
        backgroundColor: colors.card,
        borderColor: colors.border
    }

    const cardProperties = Object.assign({}, props);
    cardProperties.style = [colorStyle, style];

    if (cardProperties.touchable) return <TouchableCard {...cardProperties} />

    return <StaticCard {...cardProperties} />
}

export function SecondaryCard(props: CardProps) {

    const { style } = props;
    const { colors } = useTheme();

    const colorStyle: StyleProp<ViewStyle> = {
        backgroundColor: colors.card2,
        borderColor: colors.border
    };

    const cardProperties = Object.assign({}, props);
    cardProperties.style = [colorStyle, style];

    if (cardProperties.touchable) return <TouchableCard {...cardProperties} />

    return <StaticCard {...cardProperties} />
}

export function TransparentCard(props: CardProps) {
    const { style } = props;
    const { colors } = useTheme();

    const colorStyle: StyleProp<ViewStyle> = {
        borderColor: colors.border
    }

    const cardProperties = Object.assign({}, props);
    cardProperties.style = [style, colorStyle]

    if (cardProperties.touchable) return <TouchableCard {...cardProperties} />

    return <StaticCard {...cardProperties} />
}

function StaticCard(props: StaticCardProps) {

    const { children, ...otherProps } = props;

    return (
        <View {...otherProps}>
            {children}
        </View>
    )
}

function TouchableCard(props: TouchableCardProps) {
    const { colors } = useTheme();
    const {
        style, children,
        onPress, hitslop,
        activeColor = colors.primary, activeOpacity = 0.85, highlight = false,
        ...otherProps
    } = props

    if (highlight) return (
        <Pressable onPress={onPress} hitSlop={hitslop} style={({ pressed }) => [style, {
            backgroundColor: pressed ? activeColor : undefined,
            opacity: pressed ? activeOpacity : undefined
        }]} {...otherProps}>
            {children}
        </Pressable>
    )

    return (
        <Pressable onPress={onPress} hitSlop={hitslop} style={style} {...otherProps}>
            {children}
        </Pressable>
    )
}
