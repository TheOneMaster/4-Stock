import { useTheme } from "@react-navigation/native";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { CardProps, StaticCardProps } from "./types";

export function PrimaryCard(props: CardProps) {

    const { style, touchable, children } = props;
    const { colors } = useTheme();


    if (touchable) {
        const { onPress, hitslop } = props;

        return (
            <Pressable onPress={onPress} hitSlop={hitslop}
                style={({ pressed }) => [
                    style,
                    {
                        backgroundColor: pressed ? colors.primary : colors.card,
                        opacity: pressed ? 0.3 : 1,
                        borderColor: colors.border
                    }
                ]}>
                {children}
            </Pressable>
        )
    }

    const colorStyle: StyleProp<ViewStyle> = {
        backgroundColor: colors.card,
        borderColor: colors.border
    }

    const cardProperties = Object.assign({}, props);
    cardProperties.style = [colorStyle, style];

    return <StaticCard {...cardProperties} />
}

export function SecondaryCard(props: CardProps) {

    const { style, touchable, children } = props;
    const { colors } = useTheme();


    if (touchable) {
        const { onPress, hitslop } = props;

        return (
            <Pressable onPress={onPress} hitSlop={hitslop}
                style={({ pressed }) => [
                    style,
                    {
                        backgroundColor: pressed ? colors.primary : colors.card2,
                        opacity: pressed ? 0.3 : 1,
                        borderColor: colors.border
                    }
                ]}>
                {children}
            </Pressable>
        )
    }

    const colorStyle: StyleProp<ViewStyle> = {
        backgroundColor: colors.card2,
        borderColor: colors.border
    };

    const cardProperties = Object.assign({}, props);
    cardProperties.style = [colorStyle, style];

    return <StaticCard {...cardProperties} />
}

function StaticCard(props: StaticCardProps) {

    const { style, children } = props;

    return (
        <View style={style}>
            {children}
        </View>
    )
}
