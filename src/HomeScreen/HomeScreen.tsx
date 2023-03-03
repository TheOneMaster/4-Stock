import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import { HomeDrawerParamList, RootStackParamList } from "../navTypes";

import AboutPage from "../About/AboutPage";
import SettingsPage from "../Settings/SettingsPage";
import CustomDrawerContent from "./CustomDrawerContent";
import TournamentListView from "./TournamentListView";

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

const HomeScreen = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, "Home">) => {

    const { colors } = useTheme();

    return (
        <Drawer.Navigator screenOptions={{
            swipeEdgeWidth: 200,
            headerStyle: { backgroundColor: colors.primary },
            headerTitleStyle: { color: colors.text }
        }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}

        >
            <Drawer.Screen name="Tournaments" component={TournamentListView} />
            <Drawer.Screen name="Settings" component={SettingsPage} />
            <Drawer.Screen name="About" component={AboutPage} />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default HomeScreen;
