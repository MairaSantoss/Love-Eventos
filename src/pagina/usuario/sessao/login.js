import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Autenticacao({navigation}) {



      const [email, setEmail]=useState("fernada@email.com");
      const [id, setId]=useState('262');
      const [privilegio, SetPrivilegio]=useState('1');
      

    const sessao_start = async () => {
      try {
        await AsyncStorage.setItem('user', email);
        await AsyncStorage.setItem('id', id);
        await AsyncStorage.setItem('privilegio', privilegio);
      } catch (error) {
        console.log(error.message);
      }
    };

    const sessao_in = async () => {
        let usuario = '';
        let id = '';
        let lat = '';
        let long = '';
        let priv = '';
        try {
            usuario = await AsyncStorage.getItem('user') || null;
            id = await AsyncStorage.getItem('id') || null;
            lat = await AsyncStorage.getItem('lat') || null;
            long = await AsyncStorage.getItem('long') || null;
            priv = await AsyncStorage.getItem('privilegio') || null;
        } catch (error) {
          console.log(error.message);
        }  console.log(usuario); console.log(id);
        console.log(long); console.log(lat); console.log(priv);
      }
 
  return (
    <View style={{justifyContent:'center', alignItems:'center', flex: 1}}> 
      <Text onPress={sessao_start}>Fazer Login</Text>
      <Text onPress={sessao_in} style={{marginTop: 100}}>pegar</Text>
      <Text  onPress={() => navigation.navigate("Main")} style={{marginTop: 100}}>entrar</Text>
    </View>
   
  );
}