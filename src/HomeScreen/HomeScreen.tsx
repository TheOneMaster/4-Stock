import { createDrawerNavigator } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { HomeDrawerParamList, RootStackParamList } from "../navTypes";

import TournamentListView from "./TournamentListView";
import SettingsPage from "../Settings/SettingsPage";


const Drawer = createDrawerNavigator<HomeDrawerParamList>();

const HomeScreen = ({navigation, route}: NativeStackScreenProps<RootStackParamList, "Home">) => {

    const { colors } = useTheme();

    return (
        <Drawer.Navigator screenOptions={{
            swipeEdgeWidth: 200,
            headerStyle: {backgroundColor: colors.primary},
            headerTitleStyle: {color: colors.text}
            }}>
            <Drawer.Screen name="Tournaments" component={TournamentListView}/>
            <Drawer.Screen name="Settings" component={SettingsPage}/>
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    
})

export default HomeScreen;
