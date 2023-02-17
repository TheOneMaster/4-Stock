import 'react-native-gesture-handler'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { LogBox, StatusBar, useColorScheme } from "react-native";

import { RootStackParamList } from './navTypes';
import { customLightTheme, customDarkTheme } from "./Themes";

import TournamentView from "./Tournament/TournamentView";
import EventPage from "./Event/EventView";
import HomeScreen from './TournamentList/MainView';

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {

  const colorScheme = useColorScheme();
  

    return (
      <NavigationContainer theme={colorScheme === 'dark' ? customDarkTheme : customLightTheme}>
        <StatusBar/>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
          <Stack.Screen name="Tournament" component={TournamentView}></Stack.Screen>
          <Stack.Screen name="Event" component={EventPage}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    
    )
}

registerRootComponent(App);
// export default App;
