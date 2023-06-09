import { StyleSheet, View } from "react-native"
import { CustomText } from "./Text"


interface CenterMessageProps {
    message: string
    icon?: React.ReactNode
}

export function CenterMessage(props: CenterMessageProps) {
    return (
        <View style={styles.container}>
            {props.icon}
            <CustomText>{props.message}</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    }
})
