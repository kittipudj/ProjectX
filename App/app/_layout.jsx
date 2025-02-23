import { useEffect, useState } from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/firebaseConfig";
import { useRouter, Slot } from "expo-router";
import React from "react";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

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

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <ThemeToggle />
        <Slot />
      </View>
    </ThemeProvider>
  );
}

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        position: "absolute",
        top: 40,
        right: 20,
        backgroundColor: theme === "light" ? "#f8f9fa" : "#222",
        borderRadius: 20,
        padding: 10,
        elevation: 5,
      }}
    >
      <Ionicons
        name={theme === "light" ? "sunny-outline" : "moon-outline"}
        size={24}
        color={theme === "light" ? "#FFD700" : "#FFFFFF"}
      />
    </TouchableOpacity>
  );
};