import { StyleSheet, Text, TouchableOpacity, ScrollView, View, Image, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { auth, db } from '../../src/firebaseConfig'; // Import Firebase
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions
import { useTheme } from '../../context/ThemeContext'; // Import useTheme

export default function HomeScreen(props) {
  const { theme } = useTheme(); // Use theme from context
  const [finishedDays, setFinishedDays] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const user = auth.currentUser;

  useEffect(() => {
    const loadFinishedDays = async () => {
      const days = [];
      for (let i = 1; i <= 30; i++) {
        const docRef = doc(db, "users", user.uid, "progress", `day${i}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().finished) {
          days.push(i);
        }
      }
      setFinishedDays(days);
      setLoading(false); // Set loading to false after data is fetched
    };

    loadFinishedDays();
  }, []);

  const daysLeft = 30 - finishedDays.length;

  if (loading) {
    return <ActivityIndicator size="large" color="#1f66f2" style={styles.loadingIndicator} />; // Show loading indicator
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: theme === "light" ? "#f8f9fa" : "#222" }]}>
        <Header head="Full body" theme={theme} />
        <ProgressBar dayLeft={daysLeft} theme={theme} /> {/* Pass theme to ProgressBar */}
        <DayList finishedDays={finishedDays} theme={theme} /> {/* Pass theme to DayList */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const Header = ({ head, theme }) => {
  return (
    <SafeAreaView>
      <Text style={[styles.header, { color: theme === "light" ? "#1f66f2" : "#FFD700" }]}>{head} in 30 days</Text>
    </SafeAreaView>
  );
};

const ProgressBar = ({ dayLeft, theme }) => {
  const progress = ((30 - dayLeft) / 30) * 100;

  return (
    <SafeAreaView>
      <Text style={[styles.progressStyle, { color: "#FFFFFF", backgroundColor: "rgb(15, 44, 88)" }]}>{dayLeft} DAYS LEFT</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </SafeAreaView>
  );
};

const DayList = ({ finishedDays, theme }) => {
  return (
    <ScrollView style={styles.dayListContainer}>
      {Array.from({ length: 30 }, (_, i) => {
        const day = i + 1;
        const isFinished = finishedDays.includes(day);
        const isLocked = !isFinished && !finishedDays.includes(day - 1) && day !== 1;

        return (
          <View style={[styles.dayItem, isFinished && styles.finishedDayItem, { backgroundColor: "#fff" }]} key={i}>
            <Text style={styles.dayText}>Day {day}</Text>
            {isFinished ? (
              <Image source={require('./checkmark.png')} style={styles.checkmark} />
            ) : (
              <TouchableOpacity
                style={[
                  styles.startButton,
                  isLocked && styles.lockedButton,
                  !isLocked && { backgroundColor: theme === "light" ? "#1f66f2" : "#555" } // Apply theme to button only if not locked
                ]}
                onPress={() => !isLocked && router.push({ pathname: "/DetailScreen", params: { days: day } })}
                disabled={isLocked}
              >
                <Text style={styles.startButtonText}>{isLocked ? 'Locked' : 'Start'}</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </ScrollView>
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
    marginBottom: 10,
  },
  progressStyle: {
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    elevation: 5,
    backgroundColor: "rgb(15, 44, 88)",
    color: "#FFFFFF", // Change text color to white
  },
  dayListContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  dayItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 5,
    borderRadius: 12,
    elevation: 3,
  },
  finishedDayItem: {
    backgroundColor: '#d4edda', // Light green background for finished days
  },
  dayText: {
    fontSize: 18,
    fontWeight: "600",
  },
  startButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkmark: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  lockedButton: {
    backgroundColor: '#ccc',
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1f66f2',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});