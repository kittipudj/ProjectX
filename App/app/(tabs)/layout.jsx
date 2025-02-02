import { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkLogin = async () => {
            const userLoggedIn = await AsyncStorage.getItem("userLoggedIn");

            if (!userLoggedIn) {
                console.log("🚫 User not logged in, redirecting to LoginScreen...");
                router.replace("/LoginScreen"); // ✅ Redirect to login if not authenticated
            } else {
                console.log("✅ User is authenticated, showing tabs...");
                setIsAuthenticated(true);
            }
        };

        checkLogin();
    }, []);

    if (isAuthenticated === null) {
        return null; // 🔄 Show nothing while checking authentication
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarLabelStyle: { fontSize: 12, justifyContent: "center" },
                tabBarStyle: { backgroundColor: "#a1c6ea", height: 60 },
                tabBarActiveTintColor: "#1f66f2",
                tabBarInactiveTintColor: "black",
            }}
        >
            <Tabs.Screen name="Home" options={{ tabBarIcon: () => <Entypo name="home" size={24} color="#1f66f2" /> }} />
            <Tabs.Screen name="Discover" options={{ tabBarIcon: () => <Entypo name="compass" size={24} color="#1f66f2" /> }} />
            <Tabs.Screen name="Report" options={{ tabBarIcon: () => <MaterialCommunityIcons name="lightning-bolt" size={24} color="#1f66f2" /> }} />
            <Tabs.Screen name="Profile" options={{ tabBarIcon: () => <Ionicons name="person" size={24} color="#1f66f2" /> }} />
        </Tabs>
    );
}
