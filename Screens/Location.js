import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Location = ({ route }) => {


  const [result, setResult] = useState([]);



  // Getting Nearby Hospital Locations
  const findNearbyHospitals = () => {
    const latitude = route.params.lat
    const longitude = route.params.lon
    const loc = latitude + ", " + longitude

    const options = {
      method: 'GET',
      url: 'https://trueway-places.p.rapidapi.com/FindPlacesNearby',
      params: { location: loc, language: 'en', radius: '30000', type: 'hospital' },
      headers: {
        'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com',
        'X-RapidAPI-Key': '16ab487c1emsh9f635ca2210c431p12a01ejsn80bad9706a9c'
      }
    };

    axios.request(options).then(function (response) {
      console.log(JSON.stringify(response.data.results))
      setResult((response.data.results))
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    findNearbyHospitals();
  }, [])


  return (
    <ScrollView>
      {result.map((item, key) => {
        return (
          <View style={styles.container}>
            <Text style = {styles.header}>
                  Hospital Name
            </Text>
            <View style={styles.name}>
              <Text style={styles.HospitalName}>
                {item.name}
              </Text>
            </View>
            <Text style = {styles.header}>
              Address
            </Text>
            <View style={styles.address}>
              <Text style={styles.addressText}>
                {item.address}
              </Text>
            </View>
            <Text style = {styles.header}>
                  Distance
            </Text>
            <View style = {styles.distance}>
              <Text style = {styles.header}>
                {item.distance} Meter
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 3,
                marginBottom : 9
              }}
            />
          </View>
        )
      })}
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  header : {
    fontWeight : "bold",
    fontSize : 18
  },
  name: {
    padding: 10,
    backgroundColor: "#009688",
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
    marginTop : 5
  },
  HospitalName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white"
  },
  address: {
    padding: 10,
    backgroundColor: "rgb(255,178,102)",
    borderRadius: 10,
    marginBottom : 10
  },
  distance :{
    padding: 10,
    backgroundColor: "rgb(204,178,102)",
    borderRadius: 10,
    marginBottom : 10
  },
  addressText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black"
  }
})

export default Location