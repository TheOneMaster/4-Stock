import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { HomeDrawerParamList, HomeScreenProps } from "../navTypes";
import AboutPage from "../About/AboutPage";
import SettingsPage from "../Settings/SettingsPage";
import CustomDrawerContent from "./CustomDrawerContent";
import TournamentListView from "./TournamentListView";
import FeaturedTournamentsPage from "./Featured Tournaments/FeaturesTournamentsPage";

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

const HomeScreen = ({ navigation, route }: HomeScreenProps) => {

    const { colors } = useTheme();

    return (
        <Drawer.Navigator
            screenOptions={{
                swipeEdgeWidth: 200,
                headerStyle: { backgroundColor: colors.primary },
                headerTitleStyle: { color: colors.text }
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >

            <Drawer.Screen name="Featured Tournaments" component={FeaturedTournamentsPage} />
            <Drawer.Screen name="Tournament Search" component={TournamentListView} />
            <Drawer.Screen name="Settings" component={SettingsPage} />
            <Drawer.Screen name="About" component={AboutPage} />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default HomeScreen;
