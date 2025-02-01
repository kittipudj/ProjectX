import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function DebugScreen() {
  const router = useRouter();
  const [storageValue, setStorageValue] = useState(null);

  const clearStorage = async () => {
    await AsyncStorage.clear();
    console.log("✅ AsyncStorage Cleared!");
    setStorageValue(null);
  };

  const checkStorage = async () => {
    const value = await AsyncStorage.getItem("hasCompletedQuiz");
    setStorageValue(value);
    console.log("📂 AsyncStorage contains:", value);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>🔧 Debug Screen</Text>
      <Button title="🗑 Clear AsyncStorage" onPress={clearStorage} />
      <Button title="🔍 Check AsyncStorage" onPress={checkStorage} />
      {storageValue !== null && <Text>Stored Value: {storageValue}</Text>}
      <Button title="🏠 Go Home" onPress={() => router.push("/(tabs)/Home")} />
    </View>
  );
}
