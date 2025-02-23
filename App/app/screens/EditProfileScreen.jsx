import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../src/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useTheme } from '../../context/ThemeContext'; // Import useTheme

export default function EditProfileScreen() {
  const { theme } = useTheme(); // Use theme from context
  const router = useRouter();
  const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "", weight: "", height: "", age: "" });
  const [isEditing, setIsEditing] = useState({ firstName: false, lastName: false, email: false, weight: false, height: false, age: false });

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
  
  const handleClosePress = () => {
    router.push("/(tabs)/Profile");
  };

  const handleSave = async (field) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { [field]: userData[field] });
      setIsEditing({ ...isEditing, [field]: false });
      console.log(`✅ ${field} updated in Firestore`);
    } catch (error) {
      console.error(`❌ Error updating ${field}:`, error);
    }
  };

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  return (
    <View style={theme === "light" ? styles.containerLight : styles.containerDark}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClosePress}>
            <Ionicons name="close" size={24} color="#1f66f2" />
          </TouchableOpacity>

      <Text style={styles.header}>Edit Profile</Text>

      {["firstName", "lastName", "email","height","weight", "age"].map((field) => (
        <View key={field} style={styles.menuItem}>
          <Text style={styles.menuText}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
          {isEditing[field] ? (
            <>
              <TextInput
                style={styles.input}
                value={userData[field]}
                onChangeText={(value) => handleChange(field, value)}
                keyboardType={field === "weight" || field === "height" || field === "age" ? "numeric" : "default"}
              />
              <TouchableOpacity style={styles.saveButton} onPress={() => handleSave(field)}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(field)}>
              <Text style={styles.value}>{userData[field]}   </Text>
              <Ionicons name="pencil" size={20} color="#1f66f2" />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  containerDark: {
    flex: 1,
    backgroundColor: "#222",
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
  value: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 4,
    flex: 1,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#1f66f2",
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});
