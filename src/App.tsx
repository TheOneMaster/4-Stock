import 'react-native-gesture-handler';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { LogBox, useColorScheme } from "react-native";

import { RootStackParamList } from './navTypes';
import { customDarkTheme, customLightTheme } from "./Themes";

import { StatusBar } from 'expo-status-bar';
import EventPage from "./Event/EventView";
import HomeScreen from './HomeScreen/HomeScreen';
import TournamentView from "./Tournament/TournamentView";
import UserProfilePage from './Profile/ProfilePage';

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {

  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === "dark" ? customDarkTheme : customLightTheme;
  const statusbarBackground = colorScheme === "dark" ? "black" : colorTheme.colors.primary;

  return (
    <NavigationContainer theme={colorTheme}>
      <StatusBar animated={true} backgroundColor={statusbarBackground} translucent={false} />
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Tournament" component={TournamentView}></Stack.Screen>
        <Stack.Screen name="Event" component={EventPage}></Stack.Screen>
        <Stack.Screen name="Profile" component={UserProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

registerRootComponent(App);
// export default App;
