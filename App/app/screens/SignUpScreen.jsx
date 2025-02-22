import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../src/firebaseConfig";  // ✅ Import Firestore
import { doc, setDoc } from "firebase/firestore";  // ✅ Firestore Functions
import { useRouter } from "expo-router";

const SignUpScreen = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    setErrorMessage("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage("⚠️ All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("⚠️ Passwords do not match.");
      return;
    }

    try {
      console.log("🔄 Attempting sign-up...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("✅ User registered:", user);

      // ✅ Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        questionnaireCompleted: false,  // Add questionnaireCompleted field
      });

      Alert.alert("Success", "Account created successfully!");
      router.replace("/screens/QuestionnaireScreen");  // Navigate to Questionnaire screen
    } catch (error) {
      console.error("❌ Sign-up error:", error.message);
      setErrorMessage(`⚠️ ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <Text style={styles.subHeader}>Join us and start your journey</Text>

      {/* Name and Surname in one row */}
      <View style={styles.nameContainer}>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#5A5A5A"
          value={firstName}
          onChangeText={setFirstName}
          style={[styles.input, styles.halfInput]}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#5A5A5A"
          value={lastName}
          onChangeText={setLastName}
          style={[styles.input, styles.halfInput]}
        />
      </View>

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
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#5A5A5A"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: "#5A5A5A",
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  halfInput: {
    width: "48%",
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#B0C4DE",
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  errorText: {
    color: "#ff5252",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3b7dd8",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: "#3b7dd8",
    fontSize: 14,
  },
});

export default SignUpScreen;