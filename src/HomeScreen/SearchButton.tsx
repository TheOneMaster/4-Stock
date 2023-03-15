import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { useNavigation, useTheme } from "@react-navigation/native";
import search_icon from "../../assets/icons8-search.png"

export const SearchButton = ({ showFilter }) => {

    const navigation = useNavigation();

    const { colors } = useTheme();
    const style = StyleSheet.create({
        container: {
            padding: 20,
            width: 70,
            height: 70,
            
            borderRadius: 70 / 2,

            position: "absolute",
            bottom: 20,
            right: 20,
            justifyContent: "center",
            alignItems: "center",
            
            backgroundColor: colors.primary,
        },
        icon: {
            width: 60,
            height: 60,
            resizeMode: 'center',
            overflow: 'hidden'
        }
    })

    const test = () => {
        requestAnimationFrame(() => {
            showFilter(true);
        })
    }

    return (
        <TouchableOpacity onPress={test}>
            <View style={style.container}>
                <Image source={search_icon} style={style.icon}></Image>
            </View>
        </TouchableOpacity>
    )
}
