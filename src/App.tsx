import { registerRootComponent } from "expo";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox, useColorScheme } from "react-native";

import TournamentListView from "./TournamentList/TournamentListView";
import TournamentView from "./Tournament/TournamentView";

const Stack = createNativeStackNavigator()
LogBox.ignoreAllLogs();

function App() {

  const colorScheme = useColorScheme();
  console.log(colorScheme)

    return (
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={TournamentListView}></Stack.Screen>
          <Stack.Screen name="Tournament" component={TournamentView}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    
    )
}

registerRootComponent(App);
// export default App;
