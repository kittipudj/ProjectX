import { StyleSheet, View, Text} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'


export default function HomeScreen(props) {
    return (
        <SafeAreaProvider>
        <SafeAreaView style = {styles.container}>
             <Header head = "Full body"/>
        </SafeAreaView>
      </SafeAreaProvider>
      
    )
}

const Header = (props) => {
    return(
        <SafeAreaProvider>
        <SafeAreaView>
            <Text style = {styles.header}>{props.head} in 30 days</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,    
    backgroundColor: '#dae3e5',
  },
  header:{
    fontSize: 30,
  }
})

