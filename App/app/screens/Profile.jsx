import React from 'react'
import { Text, View, StyleSheet} from 'react-native'

export default function ProfileScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is ProfileScreen</Text>
      </View>
    )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dae3e5',
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    
  }
})