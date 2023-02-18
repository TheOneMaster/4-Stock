import { useTheme } from "@react-navigation/native";
import { View, Text, StyleSheet, StyleProp, ViewStyle, TouchableHighlight } from "react-native";

const PhaseButton = ({name, type, style}: {name: string, type?: string, style?: StyleProp<ViewStyle>}) => {

    const { colors } = useTheme();

    const testClick = () => {
        console.log(name);
    }


    return (
        <TouchableHighlight onPress={() => testClick()} style={[styles.container, {borderColor: colors.primary, backgroundColor: colors.card2}, style]}>
            <Text style={{color: colors.text}}>{name}</Text>
        </TouchableHighlight>
        
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        marginTop: 10,
        marginLeft: 10
    }
})

export default PhaseButton;
