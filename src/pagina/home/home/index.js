
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image , ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CarrosselDestaque from '../../../componente/carrossel/carrosselDestaque';
import CarrosselMemoria from '../../../componente/carrossel/carrosselMemoria';
import CarrosselPerto from '../../../componente/carrossel/carroselPerto';
import CarrosselEsporte from '../../../componente/carrossel/carrosselEsporte';
import Pesquisar from '../../../componente/pesquisa/filtro.js';
//import Logotipo from '../../../componente/logo/logo';
import _StatusBar from '../../../componente/statusBar/statusBar';

export default function Home() {
  useEffect(()=>{ 
    sessao_in(); 
  },[])

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [user, setUser] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const sessao_in = async () => {
    let usuario = null; let id = null; let lat = null; let long = null;
    try {usuario = await AsyncStorage.getItem('user') || null;
        id = await AsyncStorage.getItem('id') || null;
        lat = await AsyncStorage.getItem('lat') || null;
        long = await AsyncStorage.getItem('long') || null;}
    catch (error) {} 
      setUser(usuario);  setLatitude(lat);  setLongitude(long); setIdUser(id);}

return (
  <View style={styles.container}>
      <_StatusBar/>
      <View style={{margin: 8}}>
      
        <ScrollView showsVerticalScrollIndicator={false}>            
        <Text>colocar icone triboon, filtro de pesquisa imagem de indio</Text>
          <Pesquisar/>
          <CarrosselDestaque idUser={idUser} latitude={latitude} longitude={longitude}/>
          <CarrosselPerto idUser={idUser} latitude={latitude} longitude={longitude}/>
          <View style={{flexDirection:'row', marginTop: 15}}>
            <Text style={styles.texto}>PARA FICAR NA MEMÓRIA </Text>
            <Text style={[styles.texto, {color:"#9A9999"}]}>EVENTOS REALIZADOS</Text>
          </View>
          <CarrosselMemoria/>
          <CarrosselEsporte idUser={idUser} latitude={latitude} longitude={longitude}/> 
        </ScrollView>
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {   
    flex: 1,
    backgroundColor:'white',  
  },

  texto:{
    fontWeight:'bold'
  },

   logo:{
    fontSize: 25,
    color:'#F24141',
    
   }
});
