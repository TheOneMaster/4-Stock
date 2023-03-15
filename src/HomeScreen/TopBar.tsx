import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation, useTheme } from "@react-navigation/native";
import { HamburgerMenu } from "../Shared/SVG";
import { TournamentsTopBarNavigationProp } from "../navTypes";


const TopBar = () => {
    
    const { colors } = useTheme();
    const navigation = useNavigation<TournamentsTopBarNavigationProp>();


    const style = StyleSheet.create({
        container: {
            backgroundColor: colors.primary,
            padding: 10,
            height: 50,
            // justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        },
        menu_icon: {
            marginRight: 10
        },
        text: {
            fontWeight: 'bold',
            color: 'white'
        }
    });

    function test() {
        console.log('menu button press');
        navigation.openDrawer();
    }

    return (
        <View style={style.container}>
            <View style={style.menu_icon}>
                <TouchableOpacity onPress={test}>
                    <HamburgerMenu width={30} height={30} color='#fff'/>
                </TouchableOpacity>
            </View>

            <Text style={style.text}>StartGG Mobile App</Text>

        </View>
    )
}





export default TopBar;
