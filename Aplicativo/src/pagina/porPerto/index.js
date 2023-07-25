import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Button } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Statusbar from '../../componente/statusBar/statusBar';
import Botao from '../../componente/botao/botaoTriboon';
import Mapa from '../../componente/mapa/mapa';


export default function PorPerto({navigation}) {

  useEffect(()=>{ 
    sessao_in();
  });

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const sessao_in = async () => {
    let lat = null; let long = null;
    try {lat = await AsyncStorage.getItem('lat') || null;
        long = await AsyncStorage.getItem('long') || null;}
    catch (error) {} 
    setLatitude(lat); setLongitude(long);}



    const sessao_start = async (latitude, longitude) => {
      try {await AsyncStorage.setItem('lat', latitude);
        await AsyncStorage.setItem('long', longitude);
      } catch (error) {}}

      
  function temLocalizacao(){
    if(latitude != null && longitude != null ){
      return(
      <Pressable onPress={() => navigation.navigate('MapaEventos')}>
        <Botao 
        cor={"#F24141"}
        texto={"Mostrar eventos proximos"}/>
      </Pressable> ); }
    else{
      return(
      <Pressable
      
      onPress={async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        sessao_start( `${location.coords.latitude}`, `${location.coords.longitude}` );
      }}
      
      >

        <Botao 
        cor={"#F24141"}
        texto={"Habilitar localização"}/>
      </Pressable> ); }}


  return (
    <View style={styles.container}>
        <Statusbar/>
        <View style={{marginBottom: 30}}>
          <Mapa/>
        </View>
        <View style={styles.sessao}>
          <Text style={[styles.texto,{fontWeight:'700'}]}> VEJA OS EVENTOS PERTO DE VOCÊ, EXPLORE E FILTRE </Text>
        </View>     
        <Text style={[styles.texto, {color:'#575757'}]}> DISTÂNCIA DE ATÉ 10 KM </Text>      
        <View>
          {temLocalizacao()}
        </View>

        <Button title='Name'
        onPress={async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
           
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    justifyContent:"center"
      
  },

  texto:{
    fontSize: 14,
    textTransform:'uppercase',
    textAlign:'center',  
    marginVertical: '4%'
  },

  sessao:{
   alignSelf:'center',
    width:'60%',     
  },

});
