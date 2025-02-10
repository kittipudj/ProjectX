import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../src/firebaseConfig"; // ✅ Import Firestore
import { doc, getDoc } from "firebase/firestore"; // ✅ Firestore Functions
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("⚠️ Please enter both email and password.");
      return;
    }

    try {
      console.log("🔄 Attempting login...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("✅ User logged in:", user);

      // ✅ Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        console.warn("⚠️ No profile data found in Firestore.");
        Alert.alert("Notice", "Your profile data is missing. Please update your profile.");
      } else {
        console.log("📄 User profile data:", userDoc.data());
      }

      // ✅ Redirect to Home
      router.replace("/Home");
    } catch (error) {
      console.error("❌ Login error:", error.code, error.message);

      // ✅ Improved Error Messages
      let errorMsg = "⚠️ An error occurred. Please try again.";
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        errorMsg = "⚠️ Incorrect email or password.";
      } else if (error.code === "auth/too-many-requests") {
        errorMsg = "⚠️ Too many failed attempts. Try again later.";
      } else if (error.code === "auth/network-request-failed") {
        errorMsg = "⚠️ Network error. Check your connection.";
      } else if (error.code === "auth/invalid-email") {
        errorMsg = "⚠️ Please enter a valid email.";
      }

      setErrorMessage(errorMsg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      <Text style={styles.subHeader}>Login to continue</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#5A5A5A"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#5A5A5A"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/screens/SignUpScreen")}>
        <Text style={styles.secondaryButtonText}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", alignItems: "center", justifyContent: "center", padding: 20 },
  header: { fontSize: 28, fontWeight: "bold", color: "#1F2937", marginBottom: 5 },
  subHeader: { fontSize: 16, color: "#5A5A5A", marginBottom: 20 },
  input: { width: "100%", padding: 15, borderRadius: 10, borderWidth: 1, borderColor: "#B0C4DE", backgroundColor: "#FFFFFF", color: "#1F2937", marginBottom: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  errorText: { color: "#ff5252", fontSize: 14, marginBottom: 10 },
  button: { backgroundColor: "#3b7dd8", paddingVertical: 12, paddingHorizontal: 25, borderRadius: 10, width: "100%", alignItems: "center", marginBottom: 10 },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  secondaryButton: { paddingVertical: 10 },
  secondaryButtonText: { color: "#3b7dd8", fontSize: 14 }
});
