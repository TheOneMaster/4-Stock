import 'react-native-gesture-handler';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { LogBox, useColorScheme } from "react-native";
import { MMKV } from "react-native-mmkv"

import { RootStackParamList } from './navTypes';
import { customDarkTheme, customLightTheme } from "./Themes";

import { StatusBar } from 'expo-status-bar';
import EventPage from "./Event/EventView";
import HomeScreen from './HomeScreen/HomeScreen';
import TournamentView from "./Tournament/TournamentView";
import UserProfilePage from './Profile/ProfilePage';
import TournamentView from "./Tournament/TournamentView";
import { AppSettings } from './Settings/types';

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator<RootStackParamList>();

function initSettings() {
  const storage = new MMKV();

  if (storage.contains("settings")) {
    return
  }

  const initSettings: AppSettings = {
    "general.debug": false,
    "general.mainGame": null
  }

  storage.set("settings", JSON.stringify(initSettings));
}

initSettings();


function App() {

  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === "dark" ? customDarkTheme : customLightTheme;
  const statusbarBackground = colorScheme === "dark" ? "black" : colorTheme.colors.primary;

  return (
    <NavigationContainer theme={colorTheme}>
      <StatusBar animated={true} backgroundColor={colorTheme.colors.primary} translucent={false} />
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tournament" component={TournamentView} />
        <Stack.Screen name="Event" component={EventPage} />
        <Stack.Screen name="Profile" component={UserProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

registerRootComponent(App);
// export default App;
