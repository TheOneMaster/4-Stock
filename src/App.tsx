import 'react-native-gesture-handler';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { registerRootComponent } from "expo";
import { StatusBar } from 'expo-status-bar';
import { LogBox, useColorScheme } from "react-native";

import { RootStackParamList } from './navTypes';
import { customDarkTheme, customLightTheme } from "./Themes";

import EventView from './Event';
import MainScreen from './MainScreen';
import UserProfilePage from './Profile';
import TournamentView from './Tournament';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar animated={true} backgroundColor={colorTheme.colors.primary} translucent={false} />
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={MainScreen} />
            <Stack.Screen name="Tournament" component={TournamentView} />
            <Stack.Screen name="Event" component={EventView} />
            <Stack.Screen name="Profile" component={UserProfilePage} />
          </Stack.Navigator>
        </GestureHandlerRootView>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

registerRootComponent(App);
// export default App;
