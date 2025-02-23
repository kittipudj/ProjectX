import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { auth, db } from "../../src/firebaseConfig";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [theme, setTheme] = useState("light");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={theme === "light" ? styles.containerLight : styles.containerDark}>
        <Profile theme={theme} setTheme={setTheme} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const Profile = ({ theme, setTheme }) => {
  const router = useRouter();
  const [userData, setUserData] = useState({ weight: "", height: "", age: "" });
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

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
          setProfileImage(docSnap.data().profileImage || null); // Set profile image from Firestore
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

  const handleSettingsPress = () => {
    router.push("/screens/SettingsScreen");
  };
  const handleEditPress = () => {
    router.push("/screens/EditProfileScreen");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const user = auth.currentUser;
      if (!user) return;

      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);

      // Update profile image in Firestore
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { profileImage: imageUri });
        console.log("✅ Profile image updated in Firestore");
      } catch (error) {
        console.error("❌ Error updating profile image:", error);
      }
    }
  };

  return (
    <View style={styles.profileContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#1f66f2" />
      ) : (
        <>
          {/* Profile Title - Top Left */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Profile</Text>
          </View>

          {/* Rounded Profile Section */}
          <View style={styles.profileCard}>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.profilePictureContainer}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                style={styles.profilePicture}
                source={profileImage ? { uri: profileImage } : require("../../assets/images/profile-icon-design-free-vector.jpg")}
              />
              {isHovered && (
                <View style={styles.profilePictureOverlay}>
                  <MaterialCommunityIcons name="pencil" size={24} color="rgba(255, 255, 255, 0.7)" />
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userData?.firstName} {userData?.lastName}</Text>
              <Text style={styles.profileEmail}>{userData?.email}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.menuItem} onPress={handleEditPress}>
            <MaterialCommunityIcons name="account-edit" size={24} color="#1f66f2" />
            <Text style={styles.menuText}>My Profile</Text>
          </TouchableOpacity>

          {/* My Workouts */}
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="dumbbell" size={24} color="#1f66f2" />
            <Text style={styles.menuText}>My Workouts</Text>
          </TouchableOpacity>

          {/* Settings */}
          <TouchableOpacity style={styles.menuItem} onPress={handleSettingsPress}>
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
  containerLight: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  containerDark: {
    flex: 1,
    backgroundColor: "#333",
    paddingHorizontal: 16,
    paddingTop: 40,
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
    marginBottom: 15,
  },
  profilePictureContainer: {
    position: "relative",
    width: 110,
    height: 110,
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#1f66f2",
  },
  profilePictureOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 55,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    marginTop: 10,
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
  profileDetail: {
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
    marginBottom: 10,
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
    marginTop: 10,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});