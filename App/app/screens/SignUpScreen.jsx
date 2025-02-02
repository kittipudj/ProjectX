import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebaseConfig";  // ✅ Ensure correct path
import { useRouter } from "expo-router";  // ✅ Use Expo Router for navigation

const SignUpScreen = () => {
  const router = useRouter(); // ✅ Initialize Expo Router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Store error message

  const handleSignUp = async () => {
    setErrorMessage(""); // ✅ Reset error message

    if (!email || !password) {
      setErrorMessage("⚠️ Please enter both email and password.");
      return;
    }

    try {
      console.log("🔄 Attempting sign-up...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ User registered:", userCredential.user);
      Alert.alert("Success", "Account created successfully!");
      
      router.replace("/Home"); // ✅ Redirect to Home after sign-up

    } catch (error) {
      console.error("❌ Sign-up error:", error.message);
      setErrorMessage(`⚠️ ${error.message}`);
    }
  };

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Sign Up</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ width: "100%", padding: 10, borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ width: "100%", padding: 10, borderWidth: 1, marginBottom: 10 }}
      />

      {errorMessage ? <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text> : null}

      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Back to Login" onPress={() => router.push("/screens/LoginScreen")} color="gray" />
    </View>
  );
};

export default SignUpScreen;
