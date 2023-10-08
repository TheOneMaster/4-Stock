import 'react-native-gesture-handler';

import { LogBox, useColorScheme } from "react-native";
import { registerRootComponent } from "expo";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import * as Linking from "expo-linking"

import { RootStackParamList } from './navTypes';
import { customDarkTheme, customLightTheme, useApplicationFonts } from "./Themes";

import { GlobalProvider } from './Context/GlobalProvider';
import EventView from './Event';
import MainScreen from './MainScreen';
import UserProfilePage from './Profile';
import TournamentView from './Tournament';
import { CenterMessage } from './Shared';

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator<RootStackParamList>();
const prefix = Linking.createURL('/');

function App() {

  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === "dark" ? customDarkTheme : customLightTheme;

  const fontsLoading = useApplicationFonts();

  if (!fontsLoading) return null

  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: {
          screens: {
            Settings: "settings",
            "Featured Tournaments": "featured",
            About: "about",
            "Tournament Search": "search"
          }
        },
        Tournament: "tournament/:id",
        Event: "event/:id",
        Profile: "profile/:id"
      }
    }
  };

  // const statusbarBackground = colorScheme === "dark" ? "black" : colorTheme.colors.primary;

  return (
    <GlobalProvider>
      <NavigationContainer theme={colorTheme} linking={linking} fallback={<CenterMessage message='Loading...' />}>
        <StatusBar animated={true} backgroundColor={colorTheme.colors.primary} translucent={false} />
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={MainScreen} />
          <Stack.Screen name="Tournament" component={TournamentView} />
          <Stack.Screen name="Event" component={EventView} />
          <Stack.Screen name="Profile" component={UserProfilePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  )
}

registerRootComponent(App);
// export default App;
