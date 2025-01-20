import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


function Discover() {
    return(
     <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      </SafeAreaView>
     </SafeAreaProvider> 
    )
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dae3e5',
  }
})
    
export default Discover
