import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { CustomText } from "./Text"


interface CenterMessageProps {
    message: string
    icon?: React.ReactNode
    fill?: boolean
}

export function CenterMessage(props: CenterMessageProps) {
    const style: StyleProp<ViewStyle> = props.fill ? [styles.container, styles.fill] : styles.container

    return (
        <View style={style}>
            {props.icon}
            <CustomText>{props.message}</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    fill: {
        flex: 1,
        flexGrow: 1
    }
})
