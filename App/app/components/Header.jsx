import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

function Header(props) {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView>
            <Text style = {styles.head}>{props.topic} in 30 days</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  )
}

const styles = StyleSheet.create({
    haed: {
        color: 'red'
    },
})

export default Header
