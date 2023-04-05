import 'react-native-gesture-handler';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { registerRootComponent } from "expo";
import { StatusBar } from 'expo-status-bar';
import { LogBox, useColorScheme } from "react-native";

import { RootStackParamList } from './navTypes';
import { customDarkTheme, customLightTheme } from "./Themes";

import TournamentView from './Tournament';
import UserProfilePage from './Profile';
import MainScreen from './HomeScreen';
import EventView from './Event';

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

function App() {

  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === "dark" ? customDarkTheme : customLightTheme;
  // const statusbarBackground = colorScheme === "dark" ? "black" : colorTheme.colors.primary;

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={colorTheme}>
        <StatusBar animated={true} backgroundColor={colorTheme.colors.primary} translucent={false} />
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={MainScreen} />
          <Stack.Screen name="Tournament" component={TournamentView} />
          <Stack.Screen name="Event" component={EventView} />
          <Stack.Screen name="Profile" component={UserProfilePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

registerRootComponent(App);
// export default App;
