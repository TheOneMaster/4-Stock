import 'react-native-gesture-handler';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { LogBox, StatusBar, useColorScheme } from "react-native";
import { MMKV } from "react-native-mmkv"

import { RootStackParamList } from './navTypes';
import { customDarkTheme, customLightTheme } from "./Themes";

import EventPage from "./Event/EventView";
import HomeScreen from './HomeScreen/HomeScreen';
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


  return (
    <NavigationContainer theme={colorScheme === 'dark' ? customDarkTheme : customLightTheme}>
      <StatusBar />

      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Tournament" component={TournamentView}></Stack.Screen>
        <Stack.Screen name="Event" component={EventPage}></Stack.Screen>
      </Stack.Navigator>

    </NavigationContainer>

  )
}

registerRootComponent(App);
// export default App;
