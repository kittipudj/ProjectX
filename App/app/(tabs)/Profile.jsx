import React from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { auth } from "../../src/firebaseConfig";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header />
        <Profile />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const Header = () => (
  <SafeAreaView>
    <Text style={styles.header}>My Profile</Text>
  </SafeAreaView>
);

const Profile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
        await signOut(auth);
        router.replace("/screens/LoginScreen"); // ✅ Correct path for expo-router
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

  return (
    <View style={styles.profileContainer}>
      {/* Profile Picture */}
      <View>
        <Image style={styles.profilePicture} source={require("../../assets/images/profile-icon-design-free-vector.jpg")} />
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Firstname / Lastname" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" />
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>💪🏿 My Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>⚙️ Options </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={styles.menuText}>🔓 Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f66f2",
    marginBottom: 15,
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#1f66f2",
    marginBottom: 15,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
  },
  menuContainer: {
    width: "100%",
    marginTop: 20,
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 18,
  },
});
