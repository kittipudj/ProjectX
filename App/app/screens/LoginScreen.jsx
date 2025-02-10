import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebaseConfig";
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
      console.log("✅ User logged in:", userCredential.user);
      router.replace("/Home");
    } catch (error) {
      console.error("❌ Login error:", error.code, error.message);
      setErrorMessage(error.code === "auth/user-not-found" || error.code === "auth/wrong-password"
        ? "⚠️ Incorrect email or password."
        : `⚠️ ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      
      <Image style={styles.profilePicture} source={require("../../assets/images/logo.png")} />
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
  secondaryButtonText: { color: "#3b7dd8", fontSize: 14 },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 80,
    borderWidth: 0,
    borderColor: "#1f66f2",
    marginBottom: 5,
  },
});
