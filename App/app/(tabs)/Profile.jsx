import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Header/>
        </SafeAreaView>
      </SafeAreaProvider>
    )
}

const Header = () => {
    return(
        <SafeAreaView>
            <Text style = {styles.header}>My profile</Text>
        </SafeAreaView>
    )
}

const Profile = () => {
  return(
    <SafeAreaView>
      
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
    textAlign:"center",
  },
  })