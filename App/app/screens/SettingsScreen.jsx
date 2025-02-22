import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../src/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function SettingsScreen() {
  const router = useRouter();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          // Handle user data if needed
        } else {
          console.log("⚠️ No user data found in Firestore");
        }
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleBackPress = () => {
    router.back();
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
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
      <View style={styles.menuItem}>
        <Text style={styles.menuText}>Theme</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>{theme === "light" ? "default" : "dark"}</Text>
          <Switch
            value={theme === "dark"}
            onValueChange={toggleTheme}
          />
        </View>
      </View>

      {/* Notification Settings */}
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>App Notifications</Text>
      </TouchableOpacity>

      {/* Account Settings */}
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Account Settings</Text>
      </TouchableOpacity>

      {/* App Version and Additional Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Version 0.00.01 (BETA TEST)</Text>
        <Text style={styles.infoText}>Workout Planner and the Workout Planner Logo are trademarks of Workout Planner Inc. All rights reserved.</Text>
        <Text style={styles.infoText}>Workout Planner for mobile is built using open-source software.</Text>
      </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
  infoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
});