import { router } from 'expo-router';
import React from 'react'
import { Text, ScrollView, StyleSheet, Image, TouchableOpacity,View} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import YoutubePlayer from 'react-native-youtube-iframe';


export default function DiscoverScreen(props) {
    return (
      <SafeAreaProvider >
        <SafeAreaView style = {styles.container}>
          <Header/>
          <Custom/>
        </SafeAreaView>
        <SafeAreaView style = {styles.container1}>
          <Toppick/>
          <Youtube/>
        </SafeAreaView>
      </SafeAreaProvider>
      
    )
}

const Header = (props) => {
    return(
        <SafeAreaView>
            <Text style = {styles.header}>Discover</Text>
        </SafeAreaView>
    )
};


const Toppick  = (props) => {
  return(
      <SafeAreaView>
          <Text style = {styles.header}>Top Picks</Text>
      </SafeAreaView>
  )
}
const Custom  = (props) => {
  return (
    <ScrollView horizontal={true}>
      <SafeAreaView style={styles.Image}>
        <TouchableOpacity onPress={() => router.push({ pathname: "/CustomScreen"})}>
          <View style={styles.imageContainer}>
            <Image style={styles.circle} source={require("../../assets/images/splash.png")} />
            <Text style={styles.imageText}>SIXPACK</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image style={styles.circle} source={require("../../assets/images/muscle2.jpg")} />
            <Text style={styles.imageText}>ARM</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image style={styles.circle} source={require("../../assets/images/muscle3.jpg")} />
            <Text style={styles.imageText}> BACK</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image style={styles.circle} source={require("../../assets/images/muscle4.jpg")} />
            <Text style={styles.imageText}>  LEG</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>  
  )
}
const Youtube = () => {

  return(
    <ScrollView style = {styles.Scroll}>
      <SafeAreaView style = {styles.videoItem}>
            <YoutubePlayer
            height={170}
            width={300}
            play={false}
            videoId={'OwT_5ZnsXj0'}
            />
      </SafeAreaView>
      <SafeAreaView style = {styles.videoItem}>
            <YoutubePlayer
            height={170}
            width={300}
            play={false}
            videoId={'8cI9q3gptng'}
            />
      </SafeAreaView>
      <SafeAreaView style = {styles.videoItem}>
            <YoutubePlayer
            height={170}
            width={300}
            play={false}
            videoId={'aQqSsELq7t0'}
            />
      </SafeAreaView>
    </ScrollView>
  )
}




const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
    paddingVertical: 1,
  },
  container1: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
    paddingVertical: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1f66f2",
  },
  videoItem: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 5,
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#1f66f2",
    marginRight: 15,
  },
  Scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  Image: {
    flexDirection: "row",
    marginTop: 30 ,
    marginBottom :30,
  },
  imageText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -10 }],
    bottom: 1,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 2,
    paddingVertical: 4,
    borderRadius: 5,
  },
  imageContainer: {
    alignItems: "center",
    position: "relative",
  },
});
