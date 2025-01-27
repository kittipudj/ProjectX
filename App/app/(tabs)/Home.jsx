import { Link } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, ScrollView, View} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'


export default function HomeScreen(props) {
    return (
        <SafeAreaProvider>
        <SafeAreaView style = {styles.container}>
             <Header head = "Full body"/>
             <ProgressBar dayLeft = "30"/>
             <DayList/>
        </SafeAreaView>
        <SafeAreaView></SafeAreaView>
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
          <Link href="/DetailScreen">
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
          </Link>
        </View>
      ))}
    </ScrollView>
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
  progressStyle: {
    marginVertical: 40,
    paddingHorizontal: 40,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    height: 70,
    lineHeight: 30,
    backgroundColor: '#fff',
  },
  dayListContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dayItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dayText: {
    fontSize: 18,
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#1f66f2',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
})

