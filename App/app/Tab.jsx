import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home"
import ProfileScreen from "./screens/Profile"
import ReportScreen from "./screens/Report";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
       return(
    <Tab.Navigator 
    screenOptions={{
        tabBarShowLabel: true,
        tabBarLabelStyle:{
            fontSize: 12,
 
        },
        tabBarStyle: {
            backgroundColor: '#a1c6ea',
            height: 60,
        },
    }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: (size, color) => (
            <Entypo name="home" size={24} color="black" />
        )}}/>
        <Tab.Screen name="Report" component={ReportScreen} options={{tabBarIcon: (size, color) => (
            <MaterialCommunityIcons name="lightning-bolt" size={24} color="black" />
        )}}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon: (size, color) => (
            <Ionicons name="person" size={24} color="black" />
        )}}/>
    </Tab.Navigator>
        
);
}
