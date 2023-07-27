import { useNavigation } from "@react-navigation/native";
import { ColorValue, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { IoniconsThemed, MaterialIconsThemed } from "./IconTheme";

type BackIconProps = {
    size?: number
    circleSize?: number
    circleColor?: ColorValue
    style?: StyleProp<ViewStyle>
}

export function BackIcon(props: BackIconProps) {
    const iconSize = props.size ?? 15;
    const navigation = useNavigation();

    const goBack = () => navigation.goBack();
    return <IoniconsThemed name="arrow-back-sharp" size={iconSize} onPress={goBack} style={styles.container} />
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: "rgba(10, 10, 10, 0.8)",
        borderWidth: 0.1,
        borderColor: "white",
        borderRadius: 1000,
        alignSelf: "center"
    }
})
