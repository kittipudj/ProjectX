import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const router = useRouter();
  const [theme, setTheme] = useState("light");

  const handleBackPress = () => {
    router.back();
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    // Apply the theme change logic here
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#1f66f2" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Settings</Text>

      {/* Theme Settings */}
      <TouchableOpacity style={styles.menuItem} onPress={() => setTheme("themeOptions")}>
        <Text style={styles.menuText}>Change Theme</Text>
      </TouchableOpacity>

      {theme === "themeOptions" && (
        <View style={styles.themeOptions}>
          <TouchableOpacity
            style={styles.themeButton}
            onPress={() => handleThemeChange("light")}
          >
            <Text style={styles.themeButtonText}>Light Mode</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.themeButton}
            onPress={() => handleThemeChange("dark")}
          >
            <Text style={styles.themeButtonText}>Dark Mode</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Notification Settings */}
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>App Notifications</Text>
      </TouchableOpacity>

      {/* Account Settings */}
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Account Settings</Text>
      </TouchableOpacity>

      {/* App Version */}
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>App Version</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#1f66f2",
    marginLeft: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f66f2",
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  themeOptions: {
    marginTop: 10,
    marginBottom: 20,
  },
  themeButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});