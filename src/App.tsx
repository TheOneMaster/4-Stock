import 'react-native-gesture-handler';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { StatusBar } from 'expo-status-bar';
import { LogBox, useColorScheme } from "react-native";

import { RootStackParamList } from './navTypes';
import { customDarkTheme, customLightTheme, useApplicationFonts } from "./Themes";

import { GlobalProvider } from './Context/GlobalProvider';
import EventView from './Event';
import MainScreen from './MainScreen';
import UserProfilePage from './Profile';
import TournamentView from './Tournament';

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {

  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === "dark" ? customDarkTheme : customLightTheme;

  const fontsLoading = useApplicationFonts();

  if (!fontsLoading) return null

  // const statusbarBackground = colorScheme === "dark" ? "black" : colorTheme.colors.primary;

  return (
    <GlobalProvider>
      <NavigationContainer theme={colorTheme}>
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
