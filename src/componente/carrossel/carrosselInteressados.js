import React, { useState, useEffect} from "react";
import {ScrollView,StyleSheet,View,Image, useWindowDimensions, Text} from "react-native";
import axios from 'axios';

import { AntDesign } from '@expo/vector-icons'; 
//<Image style={[styles.imagem, {height: window.height * 0.07 , width: window.height * 0.07}]} source={{uri: `${val.foto}` }} />   

const CarrosselInteressados = ({interessado}) => {

  const [interessados, setInteressados] = useState([]);
  const [existeDados, setExisteDados] = useState(true);

  useEffect(()=>{ 
    const data = {
      request: "interestedUser",    
      interested: interessado
    };  
      axios.put('http://172.16.20.151/triboon/controll/event.php', data)
      .then(function(res){
        setInteressados(res.data); 
      if ((res.data).length === 0) 
        setExisteDados(false)
      else{ setExisteDados(true) }
    setInteressados(res.data);  })  
  },[interessados])

  const window = useWindowDimensions();
  return (
    existeDados ?
    <View style={styles.container}>
      <Text>arrumar o botao de setinha ou tirar </Text>
      <Text>arrumar mapa </Text>
      <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row'}}>      
          <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false}>  
          {interessados.map(function(val){        
          return(   
                <View key={val.idUser}>
                    <View style={[styles.card2, {height: window.height * 0.07 , width: window.height * 0.07}]} >                             
                      <Text>{val.idUser}</Text>     
                    </View> 
                </View>                      
              )})}
          </ScrollView> 
          <View>
            <AntDesign name="right" size={24} color="black" />
          </View>
      </View>
    </View>   :

    <View style={styles.container}></View>
    
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor:'white',
    marginVertical: 10
  },

  card2: {
    backgroundColor:'#D9D9D9',
    borderRadius: 130,
    marginRight: 5
  
  },

 imagem:{
    borderRadius:130,
 }
});

export default CarrosselInteressados;
