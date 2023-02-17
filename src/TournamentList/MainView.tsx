import { createDrawerNavigator } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeDrawerParamList, RootStackParamList } from "../navTypes";

import TournamentListView from "./TournamentListView";
import SettingsPage from "../Settings/SettingsPage";


const Drawer = createDrawerNavigator<HomeDrawerParamList>();

const HomeScreen = ({navigation, route}: NativeStackScreenProps<RootStackParamList, "Home">) => {

    return (
        <Drawer.Navigator screenOptions={{
            headerShown: false,
            swipeEdgeWidth: 100
            }}>
            <Drawer.Screen name="Tournaments" component={TournamentListView}/>
            <Drawer.Screen name="Settings" component={SettingsPage}/>
        </Drawer.Navigator>
    )
}

export default HomeScreen;
