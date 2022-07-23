import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Dimensions } from 'react-native';
import axios from "axios";


const Home = ({navigation}) =>  {

  // Location
  const [location, setLocation] = useState("")

  // Error Msg
  const [errormsg, setErrormsg] = useState()

  // Latitude
  const [latitude, setLatitude] = useState("");

  // Longitude
  const [longitude, setLongitude] = useState("");


  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrormsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(JSON.stringify({location}))
    setLatitude(location.coords.latitude)
    setLongitude(location.coords.longitude)
  }

  const errorText = () => {
    if(errormsg){
      Alert.alert(
        "Permission Denied",
        "Allow Location Access in Settings!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )
    }
  }


  const locationTimer = () => {
    setInterval(getLocation, 1000)
  }

  useEffect(() => {
    locationTimer()
  }, [])

  // https://cosmic-torrone-e6e1ba.netlify.app/.netlify/functions/server

  // Send Text
  const sendText = () => {
    console.log("SendText method has been called vertically!!")
    axios.post(`https://cosmic-torrone-e6e1ba.netlify.app/.netlify/functions/server/sendtext?text=${latitude+","+longitude}`)
        .then(data => {
          console.log("Data has been sent to server successfully!12 times")
          Alert.alert(
            "Alerted",
            "Your Location Details Has Been Shared.. Help is on the Way",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
        })
        .catch(err => {
          console.log(err);
        })
      
  }
  

  return (
    <View style={styles.container}>

    {/* Navbar Component */}
      <View style = {styles.navbar}>
        <Text style={styles.header}>Major Project Accident-Tracker</Text>

      </View>

      

      {/* Error Box */}
      {
        errorText()
      }

     {/* this is a comment */}
     <View style = {styles.locationBoxParent}>
      {location !== "" ? <View style = {styles.locationBox}>
        <Text style = {styles.locationText}>{location}</Text>
      </View> : null }
     </View>
     
      

    
     {/* <View style = {styles.body}>
        <TouchableOpacity style={styles.appButtonContainer} onPress = {sendText("Text")}>
          <Text style={styles.appButtonText}> Send Alert to close contact </Text>
        </TouchableOpacity>
      </View> */}

      {/* Nearby Hospitals */}
      <View style = {styles.bodyHospitals}>
        <TouchableOpacity style={styles.appButtonContainer} onPress = {() => navigation.navigate("Hospitals Near Me!", {lat : latitude, lon : longitude})}>
          <Text style={styles.appButtonText}> Get Nearby Hospitals </Text>
        </TouchableOpacity>
      </View>

      <View style = {styles.sendText}>
        <TouchableOpacity style = {styles.appButtonContainer} onPress = {sendText}>
          <Text style = {styles.appButtonText}>
            Alert Contacts
          </Text>
        </TouchableOpacity>  

      </View>
     
      

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  navbar : {
    backgroundColor : "#009688",
    marginBottom : 40
  },
  locationBoxParent : {
    position : 'absolute',
    top : 400,
    paddingHorizontal : Dimensions.get('window').width / 8.5,
  },
  locationBox : {
    backgroundColor : "#009688",
    borderRadius : 10,
    paddingHorizontal : 24,
    paddingVertical : 10
  },
  locationText : {
    color : "white",
    fontSize : 16
  },
  header: {
    fontSize: 18,
    color: 'white',
    paddingTop: 70,
    paddingHorizontal: 20,
    fontWeight: "bold",
    marginBottom: 20
  },
  serverBox : {
    position : 'absolute',
    top : 130,
    paddingHorizontal : Dimensions.get('window').width / 6.9
  },
  serverAcknowledgement:{
    backgroundColor : "#100c08",
    borderRadius : 10,
    paddingHorizontal : 24,
    paddingVertical : 10
  },
  server : {
    color : "#30b21a",
  },
  bodyHospitals : {
    position : 'absolute',
    bottom : 5,
    paddingHorizontal : Dimensions.get('window').width / 6
  },
  sendText:{
    position : 'absolute',
    bottom : 50,
    paddingHorizontal : Dimensions.get('window').width / 6
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    width : 250,
    paddingVertical : 10
  },
  appButtonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default Home;
