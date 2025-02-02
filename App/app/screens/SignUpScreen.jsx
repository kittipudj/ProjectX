import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const SignUpScreen = ({ navigation }) => {  // ✅ Keep navigation as a prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (email && password) {
      Alert.alert("Success", "Account created successfully!");
      navigation.replace("HomeScreen");  // ✅ Use navigation directly
    } else {
      Alert.alert("Error", "Please enter email and password.");
    }
  };

  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
