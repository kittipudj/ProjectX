import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image, Modal, TextInput, Animated, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { auth, db } from '../src/firebaseConfig'; // Updated import statement
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Firestore functions
import { Entypo } from '@expo/vector-icons'; // Import Entypo for 3-dots icon
import LottieView from 'lottie-react-native'; // Import LottieView

const DetailScreen = () => {
  const { days } = useLocalSearchParams();
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [workOut, setWorkOut] = useState(0);
  const [Kcal, setKcal] = useState(0);
  const [Time, setTime] = useState(0);
  const [allFinished, setAllFinished] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [setsInput, setSetsInput] = useState('');
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const user = auth.currentUser;
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const updateWorkoutDetails = (updatedExercises) => {
    const totalKcal = updatedExercises.reduce((sum, exercise) => sum + exercise.caloriesBurned, 0);
    const totalTime = updatedExercises.reduce((sum, exercise) => sum + exercise.time, 0);
    setWorkOut(updatedExercises.length);
    setKcal(totalKcal);
    setTime(totalTime);
    setAllFinished(updatedExercises.every(exercise => exercise.finished));
  };

  const handleNextExercise = () => {
    const updatedExercises = exercises.map((exercise, index) => {
      if (index === currentExerciseIndex) {
        return { ...exercise, finished: true };
      }
      return exercise;
    });
    setExercises(updatedExercises);
    updateWorkoutDetails(updatedExercises);
    saveExercisesToFirestore(updatedExercises);
    if (currentExerciseIndex < exercises.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000, // Increase duration to make it slower
        useNativeDriver: false,
      }).start(() => {
        setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
        fadeAnim.setValue(1);
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      });
    } else {
      setShowCompletionAnimation(true);
      setTimeout(() => setShowCompletionAnimation(false), 3000); // Show animation for 3 seconds
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000, // Increase duration to make it slower
        useNativeDriver: false,
      }).start(() => {
        setCurrentExerciseIndex((prevIndex) => prevIndex - 1);
        fadeAnim.setValue(1);
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      });
    }
  };

  const handleDeleteExercise = () => {
    const updatedExercises = exercises.filter((_, index) => index !== currentExerciseIndex);
    setExercises(updatedExercises);
    updateWorkoutDetails(updatedExercises);
    saveExercisesToFirestore(updatedExercises);
    setModalVisible(false);
    setCurrentExerciseIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSaveSets = () => {
    const updatedExercises = exercises.map((exercise, index) => {
      if (index === currentExerciseIndex) {
        const newSets = parseInt(setsInput, 10);
        const { caloriesBurned, time } = calculateCaloriesAndTime(exercise, newSets);
        return { ...exercise, sets: newSets, caloriesBurned, time };
      }
      return exercise;
    });
    setExercises(updatedExercises);
    updateWorkoutDetails(updatedExercises);
    saveExercisesToFirestore(updatedExercises);
    setModalVisible(false);
  };

  useEffect(() => {
    if (allFinished && user) {
      // Save the finished status to Firestore
      setDoc(doc(db, "users", user.uid, "progress", `day${days}`), { finished: true }, { merge: true });
    }
  }, [allFinished, user]);

  useEffect(() => {
    const loadExercisesFromFirestore = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid, "progress", `day${days}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data()) {
        const savedExercises = docSnap.data().exercises || [];
        setExercises(savedExercises);
        updateWorkoutDetails(savedExercises);
      } else {
        fetchExercises();
      }
    };

    const fetchExercises = async () => {
      const url = `https://exercisedb.p.rapidapi.com/exercises`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'a50a5140d3mshcdf47ec04234248p14658djsna82df48ad2ed',
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const shuffledExercises = result.sort(() => 0.5 - Math.random());
        const selectedExercises = shuffledExercises.slice(0, 10); // Select 10 random exercises
        const exercisesWithDetails = selectedExercises.map(exercise => {
          const { sets, caloriesBurned, time } = calculateCaloriesAndTime(exercise);
          return { ...exercise, sets, caloriesBurned, time, finished: false };
        });
        setExercises(exercisesWithDetails);
        updateWorkoutDetails(exercisesWithDetails);
        saveExercisesToFirestore(exercisesWithDetails);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      loadExercisesFromFirestore();
    } else {
      router.push('/screens/LoginScreen');
    }
  }, [days, user]);

  const saveExercisesToFirestore = (exercises) => {
    if (!user) return;
    setDoc(doc(db, "users", user.uid, "progress", `day${days}`), { exercises }, { merge: true });
  };

  // Calculate calories burned and time for each exercise
  const calculateCaloriesAndTime = (exercise, sets = 3) => {
    const baseCaloriesPerMinute = 8; // Example calories burned per minute (can be adjusted)
    const exerciseTime = 2; // Assume 2 minutes for each exercise (this can vary based on set)
    
    // Estimate calories burned based on time
    const caloriesBurned = baseCaloriesPerMinute * exerciseTime * sets;

    return {
      sets,
      caloriesBurned,
      time: exerciseTime * sets,
    };
  };

  if (!exercises.length) {
    return <ActivityIndicator size="large" color="#1f66f2" />;
  }

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <SafeAreaView style={styles.container}>
      <DetailHeader />
      <WorkOutDetail workOut={workOut} Kcal={Kcal} Time={Time} />
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
        <Animated.View style={[styles.exerciseCard, currentExercise.finished && styles.finishedExerciseCard, { opacity: fadeAnim }]}>
          <Text style={styles.exerciseText}>{currentExercise.name}</Text>
          <Image source={{ uri: currentExercise.gifUrl }} style={styles.gifImage} />
          <Text style={styles.exerciseText}>Sets: {currentExercise.sets}</Text>
          <Text style={styles.exerciseText}>Calories Burned: {currentExercise.caloriesBurned} kcal</Text>
          <Text style={styles.exerciseText}>Time: {currentExercise.time} min</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={() => setModalVisible(true)}>
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.navButton} onPress={handlePreviousExercise} disabled={currentExerciseIndex === 0}>
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleNextExercise}>
          <Text style={styles.navButtonText}>{currentExerciseIndex === exercises.length - 1 ? 'Finish' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
      {showCompletionAnimation && (
        <View style={styles.completionContainer}>
          <Text style={styles.completionText}>Complete!</Text>
          <LottieView
            source={require('../assets/completion-animation.json')} // Path to your Lottie animation file
            autoPlay
            loop={false}
            style={styles.completionAnimation}
          />
        </View>
      )}
      <Modal
        animationType='none'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Exercise Settings</Text>
            <TextInput
              style={styles.input}
              placeholder="Sets"
              keyboardType="numeric"
              value={setsInput}
              onChangeText={setSetsInput}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveSets}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteExercise}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const DetailHeader = () => {
  const { days } = useLocalSearchParams(); 

  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.headerText}>Day {days}</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: "/Home"})}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const WorkOutDetail = ({ workOut, Kcal, Time }) => {
  return (
    <SafeAreaView style={styles.statContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Workout</Text>
        <Text style={styles.value}>{workOut}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Kcal</Text>
        <Text style={styles.value}>{Kcal}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Time (min)</Text>
        <Text style={styles.value}>{Time}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f66f2",
    marginLeft: 10,
  },
  statContainer: {
    backgroundColor: "#202A44",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    borderColor: 'black',
    height: 90,
    borderRadius: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  divider: {
    width: 2,
    height: 70,
    backgroundColor: 'white',
  },
  value: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  exerciseCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 5,
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
  },
  finishedExerciseCard: {
    backgroundColor: '#d4edda', // Light green background for finished exercises
  },
  exerciseText: {
    fontSize: 18,
    fontWeight: '500',
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign :'center',
    fontWeight: "bold",
  },
  button: { 
    backgroundColor: "#dc143c",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: "25%",
    alignItems: "center",
  },
  gifImage: {
    width: 250,   // Set width
    height: 250,  // Set height
    marginTop: 10,
    borderRadius: 10,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: "#1f66f2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: "#1f66f2",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  completionContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  completionText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20, // Adjust to position the text above the animation
  },
  completionAnimation: {
    width: 200,
    height: 200,
  },
});

export default DetailScreen;
