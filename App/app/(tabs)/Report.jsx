import { React, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";

export default function ReportScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header />
        <Stats />
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

const Stats = () => {
  const [workOut, setWorkOut] = useState(0);
  const [Kcal, setKcal] = useState(0);
  const [Time, setTime] = useState(0);

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
});

