import {React, useState} from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'

export default function ReportScreen() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Header/>
          <Stats/>
          <Calendar style={styles.calendar} onDayPress={day => {
                    console.log('selected day', day);}}/>
        </SafeAreaView>
      </SafeAreaProvider>
    )
}

const Header = () => {
    return(
        <SafeAreaView>
            <Text style = {styles.header}>Report</Text>
        </SafeAreaView>
    )
}

const Stats = () => {
  const [workOut, setWorkOut] = useState(0)
  const [Kcal, setKcal] = useState(0)
  const [Time, setTime] = useState(0)

  return(
    <SafeAreaView style={styles.statContainer}>
      <SafeAreaView>
        <Text style={styles.statLabel}>Workout</Text>
       <Text style={styles.value}>{workOut}</Text>
      </SafeAreaView>
      <View style={styles.divider} />

      <SafeAreaView>
        <Text style={styles.statLabel}>Kcal</Text>
        <Text style={styles.value}>{Kcal}</Text>
      </SafeAreaView>
      <View style={styles.divider} />

      <SafeAreaView>
        <Text style={styles.statLabel}>Time (min)</Text>
        <Text style={styles.value}>{Time}</Text>
      </SafeAreaView>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#dae3e5',
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    header:{
      fontSize: 30,
      fontWeight: 'bold',
    },
    statContainer: {
      backgroundColor: 'white',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      padding: 20,
      borderWidth: 1,
     borderColor: 'black',
     borderRadius: 10,
     height: 90,
     marginTop: 20,
    },
    statLabel:{
    fontSize: 16,
    color: "#000",
    fontFamily: "sans-serif",
    },
    divider: {
    width: 2,
    height: 70,
    backgroundColor: "red",
    },
    value: {
      fontSize: 24,
      color: "#000",
      textAlign: 'center'
    },
    calendar: {
      marginTop: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'gray',
      height: 370
    }
  })