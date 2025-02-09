import { Link } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'


export default function HomeScreen(props) {
    return (
        <SafeAreaProvider>
        <SafeAreaView style = {styles.container}>
             <Header head = "Full body"/>
             <ProgressBar dayLeft = "30"/>
             <DayList/>
        </SafeAreaView>
      </SafeAreaProvider>
      
    )
}

const Header = (props) => {
    return(
        <SafeAreaView>
            <Text style = {styles.header}>{props.head} in 30 days</Text>
        </SafeAreaView>
    )
}

const ProgressBar = (props) => {
  return(
        <SafeAreaView>
            <Text style = {styles.progressStyle}>{props.dayLeft} DAYS LEFT</Text>
        </SafeAreaView>
  )
}

const DayList = () => {
  return(
    <ScrollView style={styles.dayListContainer}>
      {Array.from({ length: 30 }, (_, i) => (
        <View style={styles.dayItem} key={i}>
          <Text style={styles.dayText}>Day {i + 1}</Text>
          <TouchableOpacity style={styles.startButton} 
                            onPress={() => router.push({ pathname: "/DetailScreen", params: { days: i + 1 } })}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  )
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
      marginBottom: 10,
    },
    progressStyle: {
      backgroundColor: "#202A44",
      borderRadius: 12,
      padding: 15,
      fontSize: 16,
      textAlign: "center",
      fontWeight: "bold",
      color: "white",
      elevation: 5, 
    },
    dayListContainer: {
      flex: 1,
      paddingHorizontal: 10,
    },
    dayItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#fff",
      padding: 15,
      marginVertical: 5,
      borderRadius: 12,
      elevation: 3,
    },
    dayText: {
      fontSize: 18,
      fontWeight: "600",
    },
    startButton: {
      backgroundColor: "#1f66f2",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    startButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
  