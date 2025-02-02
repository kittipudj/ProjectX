import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { registerUser } from "../src/services/authService";  // ✅ Ensure correct path

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

  const handleSignUp = async () => {
    console.log("🚀 Sign-Up button clicked!");
  
    if (!email || !password || !age || !height || !weight || !goal) {
      console.error("❌ Missing required fields!");
      window.alert("Error: Please fill in all fields!");
      return;
    }
  
    const userData = {
      email,
      age: parseInt(age),
      height: parseInt(height),
      weight: parseInt(weight),
      goal,
    };
  
    try {
      const user = await registerUser(email, password, userData);
      if (user) {
        console.log("✅ User registered successfully:", user);
        window.alert("Success: Account created successfully!");
        navigation.navigate("Home");
      } else {
        console.error("❌ User registration failed!");
        window.alert("Error: Could not create an account!");
      }
    } catch (error) {
      console.error("❌ Firebase Registration Error:", error);
  
      let errorMessage = error.message;
  
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Email Already Exists",
          "This email is already registered. Would you like to log in?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Login", onPress: () => navigation.navigate("LoginScreen") },
          ]
        );
      }
      
  
      window.alert(`Error: ${errorMessage}`);
    }
  };
  
  

  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput placeholder="Height" value={height} onChangeText={setHeight} keyboardType="numeric" />
      <TextInput placeholder="Weight" value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <TextInput placeholder="Goal" value={goal} onChangeText={setGoal} />

      <Button title="SIGN UP" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
