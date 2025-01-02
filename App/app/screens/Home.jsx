import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, ScrollView} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'

export default function HomeScreen(props) {
    return (
      <SafeAreaProvider style={styles.container}>
          <SafeAreaView>
            <ScrollView>
              <Header topic = "Full body"/>
            </ScrollView>
          </SafeAreaView>
      </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,    
    backgroundColor: '#dae3e5',
  },
})

