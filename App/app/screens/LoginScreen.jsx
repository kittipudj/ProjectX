import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebaseConfig"; // ✅ Ensure correct path
import { useRouter } from "expo-router";  // ✅ Expo Router

const LoginScreen = () => {
  const router = useRouter(); // ✅ Initialize Expo Router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Store error message

  const handleLogin = async () => {
    setErrorMessage(""); // ✅ Reset error message on new attempt

    if (!email || !password) {
      setErrorMessage("⚠️ Please enter both email and password.");
      return;
    }

    try {
      console.log("🔄 Attempting login...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ User logged in:", userCredential.user);

      // ✅ Redirect to Home after successful login
      router.replace("/Home");

    } catch (error) {
      console.error("❌ Login error:", error.code, error.message);

      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setErrorMessage("⚠️ Incorrect email or password.");
      } else {
        setErrorMessage(`⚠️ ${error.message}`);
      }
    }
  };

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Login</Text>

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

      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => router.push("/screens/SignUpScreen")} color="gray" />
    </View>
  );
};

export default LoginScreen;
