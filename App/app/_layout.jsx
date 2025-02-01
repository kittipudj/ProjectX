import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";

const Layout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFirstTimeUse = async () => {
      const hasCompletedQuiz = await AsyncStorage.getItem("hasCompletedQuiz");
      if (!hasCompletedQuiz) {
        router.replace("/questionnaire"); // Navigate to the questionnaire screen
      }
      setLoading(false);
    };

    checkFirstTimeUse();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return <View>{children}</View>;
};

export default function Layout() {
    return (
      <Stack>
        <Stack.Screen name="(tabs)/Home" />
        <Stack.Screen name="questionnaire" />
      </Stack>
    );
  }
