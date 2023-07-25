import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Autenticacao() {

  const [email, setEmail]=useState("suelle");

  const cityName = 'CAMPINAS';
  const saveCityName = async cityName => {
    try {
      await AsyncStorage.setItem('cityName', email);
    } catch (error) {
       console.log(error.message);
    }
  };
  

  const getCityName = async () => {
    let cityName = '';
    try {
      cityName = await AsyncStorage.getItem('cityName') || 'none';
    } catch (error) {
      console.log(error.message);
    }  //console.log(cityName);
  }


  const deleteCityName = async () => {
    try {
      await AsyncStorage.removeItem('cityName');
    } catch (error) {
      console.log(error.message);
    }
  }



  return (
    <View style={{justifyContent:'center', alignItems:'center', flex: 1}}> 
<Text onPress={getCityName}>eai maira</Text>



<Text style={{marginTop: 100}} onPress={getCityName}>pegar</Text>
    </View>
   
  );
}