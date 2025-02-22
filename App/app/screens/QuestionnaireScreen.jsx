import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Picker } from "react-native";
import { auth, db } from "../../src/firebaseConfig"; // Corrected import path
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router"; // Import useRouter

export default function QuestionnaireScreen() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [focus, setFocus] = useState("Full Body");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter(); // Initialize router

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!weight || !height || !age) {
      setErrorMessage("⚠️ All fields are required.");
      return;
    }

    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
      setErrorMessage("⚠️ Please enter valid numeric values.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          weight: parseFloat(weight),
          height: parseFloat(height),
          age: parseInt(age, 10),
          focus,
          questionnaireCompleted: true,
        }, { merge: true });
        console.log("User data saved to Firestore:", { weight, height, age, focus, questionnaireCompleted: true });
        router.push("(tabs)/Home"); // Use router.push instead of navigation.navigate
      }
    } catch (error) {
      console.error("❌ Error saving data:", error.message);
      setErrorMessage(`⚠️ ${error.message}`);
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
      
      <Text style={styles.label}>Focus Area:</Text>
      <Picker
        selectedValue={focus}
        style={styles.picker}
        onValueChange={(itemValue) => setFocus(itemValue)}
      >
        <Picker.Item label="Full Body" value="Full Body" />
        <Picker.Item label="Upper Body" value="Upper Body" />
        <Picker.Item label="Lower Body" value="Lower Body" />
        <Picker.Item label="Core" value="Core" />
        <Picker.Item label="Back" value="Back" />
        <Picker.Item label="Cardio" value="Cardio" />
        <Picker.Item label="Chest" value="Chest" />
        <Picker.Item label="Lower Arms" value="Lower Arms" />
        <Picker.Item label="Lower Legs" value="Lower Legs" />
        <Picker.Item label="Neck" value="Neck" />
        <Picker.Item label="Shoulders" value="Shoulders" />
        <Picker.Item label="Upper Arms" value="Upper Arms" />
        <Picker.Item label="Upper Legs" value="Upper Legs" />
        <Picker.Item label="Waist" value="Waist" />
      </Picker>
      
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

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
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderColor: "#B0C4DE",
    borderWidth: 1,
    borderRadius: 10,
  },
  errorText: {
    color: "#ff5252",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
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