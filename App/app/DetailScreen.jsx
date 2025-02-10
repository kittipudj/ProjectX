import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';

const DetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <DetailHeader />
      <WorkOutDetail />
      <WorkOutList />
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

const WorkOutDetail = () => {
  const [workOut, setWorkOut] = useState(0);
  const [Kcal, setKcal] = useState(0);
  const [Time, setTime] = useState(0);

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

const WorkOutList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10&offset=0';
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
        setExercises(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#1f66f2" />;
  }

  // Calculate calories burned and time for each exercise
  const calculateCaloriesAndTime = (exercise) => {
    const baseCaloriesPerMinute = 8; // Example calories burned per minute (can be adjusted)
    const exerciseTime = 5; // Assume 5 minutes for each exercise (this can vary based on set)
    
    // Estimate calories burned based on time
    const caloriesBurned = baseCaloriesPerMinute * exerciseTime;

    // Assume 3 sets of the exercise (this can vary)
    const sets = 3;

    return {
      sets,
      caloriesBurned,
      time: exerciseTime,
    };
  };

  return (
    <FlatList
      data={exercises}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => {
        const { sets, caloriesBurned, time } = calculateCaloriesAndTime(item);

        return (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseText}>{item.name}</Text>
            <Image source={{ uri: item.gifUrl }} style={styles.gifImage} />
            <Text style={styles.exerciseText}>Sets: {sets}</Text>
            <Text style={styles.exerciseText}>Calories Burned: {caloriesBurned} kcal</Text>
            <Text style={styles.exerciseText}>Time: {time} min</Text>
          </View>
        );
      }}
    />
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
  listContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  exerciseItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 5,
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
    width: "20%",
    alignItems: "center",
  },
  gifImage: {
    width: 150,   // Set width
    height: 150,  // Set height
    marginTop: 10,
    borderRadius: 10,
  },
});

export default DetailScreen;
