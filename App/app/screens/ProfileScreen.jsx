import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../src/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useTheme } from "../../context/ThemeContext";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("⚠️ No user data found in Firestore");
        }
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme === "light" ? "#f8f9fa" : "#333" }]}>
      <Text style={styles.header}>Profile</Text>

      {userData && (
        <View style={styles.profileContainer}>
          <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileEmail}>{userData.email}</Text>
        </View>
      )}

      {/* My Workout */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("FinishedExercisesScreen")}>
        <Text style={styles.menuText}>My Workout</Text>
        <Ionicons name="chevron-forward" size={24} color="#1f66f2" />
      </TouchableOpacity>

      {/* Other profile options */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("SettingsScreen")}>
        <Text style={styles.menuText}>Settings</Text>
        <Ionicons name="chevron-forward" size={24} color="#1f66f2" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f66f2",
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
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
});
