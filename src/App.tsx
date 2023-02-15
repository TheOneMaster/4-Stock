import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { LogBox, useColorScheme } from "react-native";

import TournamentView from "./Tournament/TournamentView";
import TournamentListView from "./TournamentList/TournamentListView";
import EventPage from "./Event/EventView";
import { customLightTheme, customDarkTheme } from "./Themes";

LogBox.ignoreAllLogs();

function App() {

  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer theme={colorScheme === 'dark' ? customDarkTheme : customLightTheme}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={TournamentListView}></Stack.Screen>
          <Stack.Screen name="Tournament" component={TournamentView}></Stack.Screen>
          <Stack.Screen name="Event" component={EventPage}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    
    )
}

registerRootComponent(App);
// export default App;
