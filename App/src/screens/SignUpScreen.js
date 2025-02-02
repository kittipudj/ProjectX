import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { registerUser } from "../services/authService"; // ✅ Import Firebase function

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

  // 🚀 Function to handle sign-up
  const handleSignUp = async () => {
    if (!email || !password || !age || !height || !weight || !goal) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const userData = {
      gender: "Male", // Hardcoded for now, make it selectable in UI later
      age: parseInt(age),
      height: parseInt(height),
      weight: parseInt(weight),
      goal,
      preferences: ["Abs", "Arms"], // Default selection
    };

    const user = await registerUser(email, password, userData);
    if (user) {
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Home"); // Redirect to Home after sign-up
    } else {
      Alert.alert("Error", "Sign-up failed. Try again.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Sign Up</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Goal (e.g., Build Muscle)"
        value={goal}
        onChangeText={setGoal}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
