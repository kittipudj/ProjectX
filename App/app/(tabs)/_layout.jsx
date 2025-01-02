import { Tabs } from "expo-router"
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default () => {
    return(
        <Tabs screenOptions={{
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

            <Tabs.Screen name="Home" options={{tabBarIcon: (size, color) => (
            <Entypo name="home" size={24} color= '#1f66f2'/> 
        )}}/>
        <Tabs.Screen name="Discover" options={{tabBarIcon: (size, color) => (
            <Entypo name="compass" size={24} color='#1f66f2' /> 
        )}}/>
        <Tabs.Screen name="Report" options={{tabBarIcon: (size, color) => (
            <MaterialCommunityIcons name="lightning-bolt" size={24} color='#1f66f2' />
        )}}/>
        <Tabs.Screen name="Profile" options={{tabBarIcon: (size, color) => (
            <Ionicons name="person" size={24} color='#1f66f2' />
        )}}/>
        </Tabs>
    )
}