import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebaseConfig";
import { useRouter } from "expo-router";

const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("⚠️ Please enter both email and password.");
      return;
    }

    try {
      console.log("🔄 Attempting sign-up...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ User registered:", userCredential.user);
      Alert.alert("Success", "Account created successfully!");
      router.replace("/Home");
    } catch (error) {
      console.error("❌ Sign-up error:", error.message);
      setErrorMessage(`⚠️ ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <Text style={styles.subHeader}>Join us and start your journey</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/screens/LoginScreen")}>
        <Text style={styles.secondaryButtonText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default SignUpScreen;
