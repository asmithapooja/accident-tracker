import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './Screens/Home';
import Location from './Screens/Location';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen name = "Hospitals Near Me!" component={Location} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 90,
  }
});
