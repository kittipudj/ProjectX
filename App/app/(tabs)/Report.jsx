import { React, useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { auth, db } from '../../src/firebaseConfig'; // Import Firebase
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions

export default function ReportScreen() {
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
      <SafeAreaView style={styles.container}>
        <Header />
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
});

