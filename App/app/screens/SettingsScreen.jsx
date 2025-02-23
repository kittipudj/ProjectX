import React, { useState, useEffect } from "react"; // Ensure useState is imported
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../src/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useTheme } from "../../context/ThemeContext";

export default function SettingsScreen({ route }) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

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

  const handleClosePress = () => {
    if (route?.params?.screen === "Profile") {
      router.push("/tabs/Profile");
    } else {
      router.push("/Profile");
    }
  };

  const toggleNotifications = () => {
    setIsNotificationsEnabled((prev) => !prev);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === "light" ? "#f8f9fa" : "#333" }]}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={handleClosePress}>
        <Ionicons name="close" size={24} color="#1f66f2" />
      </TouchableOpacity>

      <Text style={styles.header}>Settings</Text>

      {/* Theme Settings */}
      <View style={styles.menuItem}>
        <Text style={styles.menuText}>Theme</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>{theme === "light" ? "Default" : "Dark"}</Text>
          <Switch
            value={theme === "dark"}
            onValueChange={toggleTheme}
          />
        </View>
      </View>

      {/* Notification Settings */}
      <View style={styles.menuItem}>
        <Text style={styles.menuText}>App Notifications</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>{isNotificationsEnabled ? "Off" : "On"}</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={toggleNotifications}
          />
        </View>
      </View>

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
    padding: 16,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
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