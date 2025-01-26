import React from 'react'
import { Text, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native'
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
  return(
    <ScrollView horizontal={true}>
      <SafeAreaView style = {styles.Image}>
        <TouchableOpacity >
          <Image
          style={styles.circle}
          source={require("C:/Users/ASUS/Documents/GitHub/ProjectX/App/assets/images/splash.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image
          style={styles.circle}
          source={require("C:/Users/ASUS/Documents/GitHub/ProjectX/App/assets/images/muscle2.jpg")}
          />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image
          style={styles.circle}
          source={require("C:/Users/ASUS/Documents/GitHub/ProjectX/App/assets/images/muscle3.jpg")}
          />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image
          style={styles.circle}
          source={require("C:/Users/ASUS/Documents/GitHub/ProjectX/App/assets/images/muscle4.jpg")}
          />
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
  container:{
    flex: 0.5,
    backgroundColor: '#dae3e5',
    paddingHorizontal: 16,
    paddingVertical: 1,
  },
  container1:{
    flex: 1,
    backgroundColor: '#dae3e5',
    paddingHorizontal: 16,
    paddingVertical: 1,
  },
  header:{
    fontSize: 30,
    fontWeight: 'bold',
  },
  videoItem: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 75, 
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 20,
  },
  Scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  Image :{
    flexDirection :"row",
    marginTop: 20,
  
  }
  

})

