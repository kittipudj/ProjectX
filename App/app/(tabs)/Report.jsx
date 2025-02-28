import { React, useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { auth, db } from '../../src/firebaseConfig'; // Import Firebase
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'; // Firestore functions
import { ProgressBar } from 'react-native-paper';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useTheme } from '../../context/ThemeContext'; // Import useTheme

export default function ReportScreen() {
  const { theme } = useTheme(); // Use theme from context
  const [workOut, setWorkOut] = useState(0);
  const [Kcal, setKcal] = useState(0);
  const [Time, setTime] = useState(0);
  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const user = auth.currentUser;

  useEffect(() => {
    const loadWorkoutData = async () => {
      if (!user) return; // Ensure user is defined

      let totalWorkOut = 0;
      let totalKcal = 0;
      let totalTime = 0;
      const dates = {};

      for (let i = 1; i <= 30; i++) {
        const docRef = doc(db, "users", user.uid, "progress", `day${i}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data() && docSnap.data().finished) {
          totalWorkOut++;
          totalKcal += 100; // Example value, replace with actual data
          totalTime += 30; // Example value, replace with actual data
          const date = new Date();
          date.setDate(date.getDate() - (30 - i));
          const dateString = date.toISOString().split('T')[0];
          dates[dateString] = { marked: true, dotColor: '#1f66f2' };
        }
      }

      setWorkOut(totalWorkOut);
      setKcal(totalKcal);
      setTime(totalTime);
      setMarkedDates(dates);
      setLoading(false); // Set loading to false after data is fetched
    };

    loadWorkoutData();
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" color="#1f66f2" style={styles.loadingIndicator} />; // Show loading indicator
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: theme === "light" ? "#f8f9fa" : "#222" }]}>
        <Header />
        <ScrollView>
        <Stats workOut={workOut} Kcal={Kcal} Time={Time} />
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#f8f9fa",
            textSectionTitleColor: "#1f66f2",
            selectedDayBackgroundColor: "#1f66f2",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#ff6b6b",
            dayTextColor: "#000000",
            arrowColor: "#1f66f2",
            monthTextColor: "#1f66f2",
          }}
          markedDates={markedDates}
          onDayPress={(day) => {
            console.log("Selected day", day);
          }}
        />
        <BMIComponent/>
        <WaterIntakeComponent/>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const Header = () => {
  return (
    <SafeAreaView>
      <Text style={styles.header}>📊 My Progress</Text>
    </SafeAreaView>
  );
};

const Stats = ({ workOut, Kcal, Time }) => {
  return (
    <SafeAreaView style={styles.statContainer}>
      <View style={styles.statBox}>
        <Text style={styles.statLabel}>💪 Workouts</Text>
        <Text style={styles.value}>{workOut}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.statBox}>
        <Text style={styles.statLabel}>🔥 Calories</Text>
        <Text style={styles.value}>{Kcal} kcal</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.statBox}>
        <Text style={styles.statLabel}>⏳ Time</Text>
        <Text style={styles.value}>{Time} min</Text>
      </View>
    </SafeAreaView>
  );
};

const BMIComponent = () => {
  const [weight, setWeight] = useState("-");
  const [height, setHeight] = useState("-");
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (uid) {
        const db = getFirestore();
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setWeight(data.weight);
          setHeight(parseFloat(data.height));
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchData();
  }, [uid]);

  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
  let category = '';
  let progress = 0;
  let color = '#4CAF50';

  if (bmi < 18.5) {
    category = 'น้ำหนักต่ำกว่าเกณฑ์';
    progress = 0.2;
    color = '#2196F3';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'น้ำหนักเพื่อสุขภาพ';
    progress = 0.5;
    color = '#4CAF50';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'น้ำหนักเกิน';
    progress = 0.75;
    color = '#FFC107';
  } else {
    category = 'โรคอ้วน';
    progress = 1;
    color = '#F44336';
  }

  const increaseWeight = () => setWeight((prevWeight) => (parseFloat(prevWeight) + 1).toString());
  const decreaseWeight = () => setWeight((prevWeight) => (parseFloat(prevWeight) - 1).toString());

  return (
    <View style={styles.container1}>
      <Text style={styles.title}>BMI (kg/m²)</Text>
      <Text style={styles.bmi}>{bmi}</Text>
      <Text style={[styles.category, { color }]}>{category}</Text>
      <ProgressBar progress={progress} color={color} style={styles.progressBar} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.smallerButton} onPress={decreaseWeight}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallerButton} onPress={increaseWeight}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WaterIntakeComponent = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [totalWaterIntake, setTotalWaterIntake] = useState(0);
  const [uid, setUid] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [recommendedWaterIntake, setRecommendedWaterIntake] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (uid) {
        const db = getFirestore();
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const age = data.age;
          const gender = data.gender;
          setRecommendedWaterIntake(getRecommendedWaterIntake(age, gender));
        }
      }
    };

    fetchData();
  }, [uid]);

  useEffect(() => {
    const fetchData = async () => {
      if (uid) {
        const db = getFirestore();
        const docRef = doc(db, "users", uid, "progress", "waterIntake");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.date !== currentDate) {
            await updateDoc(docRef, { waterIntake: 0, date: currentDate });
            setTotalWaterIntake(0);
          } else {
            setTotalWaterIntake(data.waterIntake || 0);
          }
        } else {
          console.log("No such document!");
          await setDoc(docRef, { waterIntake: 0, date: currentDate }); // Create the document if it doesn't exist
        }
      }
    };

    fetchData();
  }, [uid, currentDate]);

  const increaseWaterIntake = () => setWaterIntake((prev) => prev + 1);
  const decreaseWaterIntake = () => setWaterIntake((prev) => prev - 1 );

  const confirmWaterIntake = async () => {
    if (uid) {
      const newTotalWaterIntake = totalWaterIntake + waterIntake;
      setTotalWaterIntake(newTotalWaterIntake);
      setWaterIntake(0); // Reset the current water intake
      const db = getFirestore();
      const docRef = doc(db, "users", uid, "progress", "waterIntake");
      await updateDoc(docRef, { waterIntake: newTotalWaterIntake, date: currentDate });
    }
  };

  const getRecommendedWaterIntake = (age, gender) => {
    if (age >= 1 && age <= 3) return "4-5";
    if (age >= 4 && age <= 8) return "5-7";
    if (age >= 9 && age <= 12) return "7-10";
    if (age >= 13 && age <= 18) return gender === "male" ? "10-12" : "8-10";
    if (age >= 19 && age <= 60) return gender === "male" ? "10-12" : "8-10";
    if (age > 60) return "6-8";
    return "";
  };

  return (
    <View style={styles.container1}>
      <Text style={styles.title}>Water Intake</Text>
      <Text style={styles.waterIntakeText}>
        <Text style={{ color: '#32CD32' }}>{totalWaterIntake}</Text> / {recommendedWaterIntake} <Text style={{fontSize:14  }}>cups per day</Text>
       </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.smallerButton} onPress={decreaseWaterIntake}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.waterIntake}>{waterIntake}</Text>
        <TouchableOpacity style={styles.smallerButton} onPress={increaseWaterIntake}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallerConfirmButton} onPress={confirmWaterIntake}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f66f2",
    marginBottom: 20,
  },
  statContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    marginBottom: 20,
  },
  statBox: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f66f2",
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
  },
  divider: {
    width: 2,
    height: 50,
    backgroundColor: "#ccc",
  },
  calendar: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 5,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 5,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bmi: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: 16,
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#1f66f2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  smallerButton: {
    backgroundColor: '#1f66f2',
    padding: 3,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  waterIntake: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
    alignItems: 'center'
  },
  confirmButton: {
    backgroundColor: '#1f66f2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  smallerConfirmButton: {
    backgroundColor: '#1f66f2',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  totalWaterText: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
    fontWeight: 'bold',
  },
  smallerTotalWaterText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    fontWeight: 'bold',
  },
  waterIntakeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
});

