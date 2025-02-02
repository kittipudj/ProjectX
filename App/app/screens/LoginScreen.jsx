import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebaseConfig"; // ✅ Corrected relative path
import { useRouter } from "expo-router";  // ✅ Import router


const LoginScreen = () => {
  const router = useRouter(); // ✅ Initialize router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ User logged in:", userCredential.user);
      router.replace("/Home"); // ✅ Try this if using grouped folders
    } catch (error) {
      console.error("❌ Login error:", error.message);
      Alert.alert("Login Failed", error.message);
    }
  };
  

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
