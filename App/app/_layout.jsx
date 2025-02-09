import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/firebaseConfig";
import { useRouter, Slot } from "expo-router";

export default function Layout() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        console.log("🔍 Checking Firebase Auth state...");

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("📂 Firebase User:", user);
            setIsAuthenticated(!!user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#1f66f2" />
            </View>
        );
    }

    return <Slot />; // ✅ Just renders (tabs)/_layout.jsx
}
