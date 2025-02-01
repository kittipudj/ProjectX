import { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, Slot, usePathname } from "expo-router";

export default function Layout() {
  console.log("🚀 Root _layout.jsx is being loaded");

  const router = useRouter();
  const pathname = usePathname(); // Get current route
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    console.log("🧐 Checking AsyncStorage...");
    
    const checkFirstTimeUse = async () => {
      try {
        const hasCompletedQuiz = await AsyncStorage.getItem("hasCompletedQuiz");
        console.log("📂 Retrieved from AsyncStorage:", hasCompletedQuiz);

        if (!hasCompletedQuiz) {
          console.log("➡️ Setting destination to Questionnaire...");
          setDestination("/questionnaire");
        } else {
          console.log("🏠 Setting destination to Home...");
          setDestination("/(tabs)/Home");
        }
      } catch (error) {
        console.error("❌ Error reading storage:", error);
      } finally {
        console.log("✅ Finished checking, stopping loading...");
        setLoading(false);
      }
    };

    // 🚨 Prevent redirect issues when inside tabs
    if (!pathname.startsWith("/(tabs)")) {
      checkFirstTimeUse();
    } else {
      console.log("🛑 Already inside tabs, skipping AsyncStorage check...");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log(`🔎 Checking navigation... loading: ${loading}, destination: ${destination}`);
    
    if (!loading && destination && pathname === "/") {
      console.log(`🚀 Navigating to ${destination} NOW!`);
      router.replace(destination);
    }
  }, [loading, destination]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log("✅ Rendering the main app (Slot)");
  return <Slot />;
}
