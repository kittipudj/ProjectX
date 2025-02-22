import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";  
import SignUpScreen from "./screens/SignUpScreen";  
import Tabs from "./(tabs)/_layout";  // ✅ Correct import
import Custom from './screens/Custom/CustomScreenPage1';
import QuestionnaireScreen from "./screens/QuestionnaireScreen";  // ✅ Import QuestionnaireScreen
import Index from "./index";  // ✅ Import Index

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Custom" component={Custom} options={{ headerShown: false }} />
        <Stack.Screen name="QuestionnaireScreen" component={QuestionnaireScreen} options={{ headerShown: false }} />  {/* Add QuestionnaireScreen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}