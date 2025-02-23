import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../(tabs)/Home';
import DetailScreen from '../DetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen'; // Import the profile screen
import FinishedExercisesScreen from '../screens/FinishedExercisesScreen'; // Import the new screen

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> {/* Add the profile screen */}
      <Stack.Screen name="FinishedExercisesScreen" component={FinishedExercisesScreen} /> {/* Add the new screen */}
    </Stack.Navigator>
  );
}
