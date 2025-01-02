import React, { useState } from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home"
import ProfileScreen from "./screens/Profile"
import ReportScreen from "./screens/Report";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Discover from "./screens/Discover";


const Tab = createBottomTabNavigator();

export default function Tabs() {
       return(
    <Tab.Navigator 
    screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle:{
        fontSize: 12,
        justifyContent: 'center'
 
        },
        tabBarStyle: {
            backgroundColor: '#a1c6ea',
            height: 60,       
        },
        tabBarActiveTintColor: '#1f66f2',
        tabBarInactiveTintColor: 'black',
        
    }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: (size, color) => (
            <Entypo name="home" size={24} color= '#1f66f2'/> 
        )}}/>
        <Tab.Screen name="Discover" component={Discover} options={{tabBarIcon: (size, color) => (
            <Entypo name="compass" size={24} color='#1f66f2' /> 
        )}}/>
        <Tab.Screen name="Report" component={ReportScreen} options={{tabBarIcon: (size, color) => (
            <MaterialCommunityIcons name="lightning-bolt" size={24} color='#1f66f2' />
        )}}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon: (size, color) => (
            <Ionicons name="person" size={24} color='#1f66f2' />
        )}}/>
    </Tab.Navigator>
        
);
}
