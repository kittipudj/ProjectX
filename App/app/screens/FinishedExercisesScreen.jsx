import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from '../../src/firebaseConfig'; 
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from "expo-router";

export default function FinishedExercisesScreen() {
  const [finishedExercises, setFinishedExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const router = useRouter();

  const handleClosePress = () => {
    router.push("/(tabs)/Profile");
  };

  useEffect(() => {
    const loadFinishedExercises = async () => {
      if (!user) return; // Ensure user is defined

      const exercises = [];
      for (let i = 1; i <= 30; i++) {
        const docRef = doc(db, "users", user.uid, "progress", `day${i}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data() && docSnap.data().exercises) {
          const dayExercises = docSnap.data().exercises.filter(exercise => exercise.finished);
          exercises.push(...dayExercises);
        }
      }
      setFinishedExercises(exercises);
      setLoading(false); // Set loading to false after data is fetched
    };
  
    loadFinishedExercises();
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" color="#1f66f2" style={styles.loadingIndicator} />; // Show loading indicator
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handleClosePress}>
          <Ionicons name="close" size={24} color="#1f66f2" />
      </TouchableOpacity>
      <Text style={styles.header}>Finished Exercises</Text>
      <ScrollView>
        {finishedExercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDetails}>Sets: {exercise.sets}</Text>
            <Text style={styles.exerciseDetails}>Calories Burned: {exercise.caloriesBurned} kcal</Text>
            <Text style={styles.exerciseDetails}>Time: {exercise.time} min</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f66f2",
    textAlign: "center",
    marginBottom: 20,
  },
  exerciseItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 12,
    elevation: 3,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
  },
  exerciseDetails: {
    fontSize: 16,
    color: "#333",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
});
