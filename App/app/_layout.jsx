import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Slot, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return; // 🚀 Prevents early navigation error

        const checkLogin = async () => {
            console.log("🔍 Checking AsyncStorage...");
            const userExists = await AsyncStorage.getItem("userLoggedIn");

            console.log("📂 Retrieved from AsyncStorage:", userExists);

            if (!userExists) {
                console.log("🚫 No user found, delaying navigation...");
                setTimeout(() => {
                    router.replace("/screens/LoginScreen"); // ✅ Delayed navigation
                }, 500);
            } else {
                console.log("✅ User exists, proceeding to app...");
                setIsAuthenticated(true);
            }
            setLoading(false);
        };

        checkLogin();
    }, [isMounted]); // ✅ Only run when mounted

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#1f66f2" />
            </View>
        );
    }

    console.log("✅ Rendering main UI");
    return <Slot />;
}
