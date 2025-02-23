import React, { useState, useEffect } from "react"; // Ensure useState is imported
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert, Modal, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../src/firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useTheme } from "../../context/ThemeContext";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default function SettingsScreen({ route }) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  const handleReset = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const credential = EmailAuthProvider.credential(user.email, password);
    try {
      await reauthenticateWithCredential(user, credential);
      // Delete user progress
      for (let i = 1; i <= 30; i++) {
        const docRef = doc(db, "users", user.uid, "progress", `day${i}`);
        await deleteDoc(docRef);
      }
      Alert.alert("Success", "All progress has been reset.");
      setModalVisible(false);
    } catch (error) {
      setError("Incorrect password. Please try again.");
    }
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

      {/* Reset Progress */}
      <TouchableOpacity style={styles.menuItem} onPress={() => setModalVisible(true)}>
        <Text style={styles.menuText}>Reset Progress</Text>
        <Ionicons name="chevron-forward" size={24} color="#1f66f2" />
      </TouchableOpacity>

      {/* App Version and Additional Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Version 0.00.01 (BETA TEST)</Text>
        <Text style={styles.infoText}>Workout Planner and the Workout Planner Logo are trademarks of Workout Planner Inc. All rights reserved.</Text>
        <Text style={styles.infoText}>Workout Planner for mobile is built using open-source software.</Text>
      </View>

      {/* Reset Progress Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Progress</Text>
            <Text style={styles.modalText}>Are you sure you want to reset all your progress? This action cannot be undone.</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleReset}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: "#1f66f2",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});