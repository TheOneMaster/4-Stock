import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { HomeDrawerParamList, HomeScreenProps } from "../navTypes";
import CustomDrawerContent from "./CustomDrawerContent";

import FeaturedTournamentsPage from "./Featured Tournaments";
import TournamentList from "./Tournament Search";
import SettingsPage, { useSettings } from "./Settings";
import AboutPage from "./About";
import { DebugPage } from "./Debug"

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

const MainScreen = ({ navigation, route }: HomeScreenProps) => {

    const { colors } = useTheme();
    const { general } = useSettings();

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
            <Drawer.Screen name="Tournament Search" component={TournamentList} />
            <Drawer.Screen name="Settings" component={SettingsPage} />
            <Drawer.Screen name="About" component={AboutPage} />

            {general.debug
                ? <Drawer.Group>
                    <Drawer.Screen name="Debug Testing" component={DebugPage} />
                </Drawer.Group>
                : null}



        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default MainScreen;
