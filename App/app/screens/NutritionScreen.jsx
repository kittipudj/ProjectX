import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '../../context/ThemeContext'; // Import useTheme

export default function NutritionScreen() {
  const { theme } = useTheme(); // Use theme from context

  return (
    <SafeAreaProvider>
      <SafeAreaView style={theme === "light" ? styles.containerLight : styles.containerDark}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.header}>Nutrition for Exercisers</Text>
          <Text style={styles.sectionHeader}>1. Balanced Diet</Text>
          <Text style={styles.text}>
            A balanced diet is crucial for exercisers to maintain energy levels and support muscle recovery. Include a mix of carbohydrates, proteins, and fats in your meals.
          </Text>
          <Text style={styles.sectionHeader}>2. Hydration</Text>
          <Text style={styles.text}>
            Staying hydrated is essential for optimal performance. Drink plenty of water before, during, and after exercise.
          </Text>
          <Text style={styles.sectionHeader}>3. Pre-Workout Nutrition</Text>
          <Text style={styles.text}>
            Consume a small meal or snack rich in carbohydrates and moderate in protein about 1-2 hours before exercising to fuel your workout.
          </Text>
          <Text style={styles.sectionHeader}>4. Post-Workout Nutrition</Text>
          <Text style={styles.text}>
            After exercising, replenish your energy stores and support muscle recovery with a meal or snack containing both carbohydrates and protein within 30 minutes to 2 hours.
          </Text>
          <Text style={styles.sectionHeader}>5. Supplements</Text>
          <Text style={styles.text}>
            While whole foods should be your primary source of nutrients, supplements like protein powder, BCAAs, and multivitamins can help fill nutritional gaps.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  containerDark: {
    flex: 1,
    backgroundColor: "#222",
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f66f2",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f66f2",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    lineHeight: 24,
  },
});
