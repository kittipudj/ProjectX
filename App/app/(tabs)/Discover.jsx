import { router } from 'expo-router';
import React from 'react'
import { Text, ScrollView, StyleSheet, Image, TouchableOpacity,View} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import YoutubePlayer from 'react-native-youtube-iframe';
import { useTheme } from '../../context/ThemeContext'; // Import useTheme

export default function DiscoverScreen(props) {
    const { theme } = useTheme(); // Use theme from context

    return (
      <SafeAreaProvider >
        <SafeAreaView style = {[styles.container, { backgroundColor: theme === "light" ? "#f8f9fa" : "#222" }]}>
          <Header/>
          <Custom/>
        </SafeAreaView>
        <SafeAreaView style = {[styles.container1, { backgroundColor: theme === "light" ? "#f8f9fa" : "#222" }]}>
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
        <TouchableOpacity onPress={() => router.push({ pathname: "/screens/Custom/CustomScreenPage1"})}>
          <View style={styles.imageContainer}>
            <Image style={styles.circle} source={require("../../assets/images/cleanfood.jpg")} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: "/screens/Custom//CustomScreenPage2"})}>
          <View style={styles.imageContainer}>
            <Image style={styles.circle} source={require("../../assets/images/warm.jpg")} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: "/screens/Custom//CustomScreenPage3"})}>
          <View style={styles.imageContainer}> 
            <Image style={styles.circle} source={require("../../assets/images/waterdrink.jpg")} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: "/screens/Custom//CustomScreenPage4"})}>
          <View style={styles.imageContainer}>
            <Image style={styles.circle} source={require("../../assets/images/sleep.jpg")} />
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
    paddingHorizontal: 16,
    paddingVertical: 1,
  },
  container1: {
    flex: 1,
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
