import { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, Stack, useRootNavigationState } from "expo-router";

export default function Layout() {
  console.log("🚀 Root _layout.jsx is being loaded");

  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!navigationState?.key) {
      console.log("🔄 Navigation state is NOT ready yet...");
      return;
    }

    console.log("🟢 Navigation state is ready!");

    const initializeApp = async () => {
      try {
        const hasCompletedQuiz = await AsyncStorage.getItem("hasCompletedQuiz");
        console.log("📂 Retrieved from AsyncStorage:", hasCompletedQuiz);

        if (!hasCompletedQuiz) {
          console.log("➡️ Navigating to Questionnaire...");
          router.replace("/questionnaire");
        } else {
          console.log("🏠 Navigating to Home...");
          router.replace("/(tabs)/Home");
        }
      } catch (error) {
        console.error("❌ Error reading storage:", error);
      } finally {
        setInitialized(true);
        console.log("✅ App is fully initialized.");
      }
    };

    setTimeout(initializeApp, 500); // Add slight delay to avoid race conditions
  }, [navigationState?.key]);

  if (!navigationState?.key || !initialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="questionnaire" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/_layout" options={{ headerShown: false }} />
    </Stack>
  );
}
