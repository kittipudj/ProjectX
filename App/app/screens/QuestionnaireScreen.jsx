import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from "../../src/firebaseConfig"; // Corrected import path
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router"; // Import useRouter

export default function QuestionnaireScreen() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter(); // Initialize router

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        weight,
        height,
        age,
        questionnaireCompleted: true,
      }, { merge: true });
      console.log("User data saved to Firestore:", { weight, height, age, questionnaireCompleted: true });
      router.push("(tabs)/Home"); // Use router.push instead of navigation.navigate
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Questionnaire</Text>
      <Text style={styles.subHeader}>Please fill out the following information</Text>
      
      <Text style={styles.label}>Weight (kg):</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Height (cm):</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f66f2",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: "#5A5A5A",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#1F2937",
  },
  input: {
    height: 40,
    borderColor: "#B0C4DE",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    backgroundColor: "#3b7dd8",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});