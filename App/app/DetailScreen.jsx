import { ScrollView, StyleSheet, Text, View, FlatList,TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams,router } from 'expo-router';

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
  const { days } = useLocalSearchParams(); // Replace with useRoute if not using expo-router

  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.headerText}>Day {days}</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: "\Home"})}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const WorkOutDetail = () => {
  const [workOut, setWorkOut] = useState(0); // Example default values
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
  const exercises = Array.from({ length: 30 }, (_, i) => `Exercise ${i + 1}`);

  return (
    <FlatList
      data={exercises}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.exerciseItem}>
          <Text style={styles.exerciseText}>{item}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dae3e5',
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
    fontSize: 25,
    marginLeft: 10,
    marginTop: 10,
    fontFamily: 'Inter-Black',
  },
  statContainer: {
    backgroundColor: 'white',
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
    color: '#000',
    fontFamily: 'Inter-Black'
  },
  divider: {
    width: 2,
    height: 70,
    backgroundColor: 'red',
  },
  value: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
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
    fontFamily: 'Inter-Black'
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign :'center',
    fontWeight: "bold",
  },
  button: { backgroundColor: "#dc143c",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: "20%",
    alignItems: "center",
    
  }
});

export default DetailScreen;