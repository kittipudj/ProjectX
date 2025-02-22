import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { auth, db } from "../../src/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Profile />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch User Data from Firestore
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
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/screens/LoginScreen");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View style={styles.profileContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#1f66f2" />
      ) : (
        <>

          {/* Rounded Profile Section */}
          <View style={styles.profileCard}>
            <Image
              style={styles.profilePicture}
              source={require("../../assets/images/profile-icon-design-free-vector.jpg")}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userData?.firstName} {userData?.lastName}</Text>
              <Text style={styles.profileEmail}>{userData?.email}</Text>
            </View>
          </View>

          {/* My Workouts */}
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="dumbbell" size={24} color="#1f66f2" />
            <Text style={styles.menuText}>My Workouts</Text>
          </TouchableOpacity>

          {/* Settings */}
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="#1f66f2" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={20} color="white" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
    paddingTop: 40, // ✅ Adjusted to move content higher
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
  },

  /* Header */
  headerContainer: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f66f2",
  },

  /* Profile Section */
  profileCard: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15, // ✅ Reduced spacing to move up
  },
  profilePicture: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#1f66f2",
    position: "absolute",
    top: -45,
  },
  profileInfo: {
    marginTop: 50,
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },

  /* Menu */
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10, // ✅ Reduced spacing
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },

  /* Logout */
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff5252",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    elevation: 3,
    marginTop: 10, // ✅ Reduced spacing
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

