import React, {useState, useEffect} from "react";
import axios from 'axios';
import {ScrollView, StyleSheet, View, useWindowDimensions} from "react-native";

import Modal from '../modal/modalCarrosselMemoria';

const CarrosselMemoria = ( ) => {

  const [noticias, setNoticias] = useState([]);

  useEffect(()=>{
    const montagem = axios.get('http://172.16.20.151/api/lista.php')
    .then(function(res){
      setNoticias(res.data);       
    })
    //console.log(noticias); 
    return () => clearInterval(montagem);
  },[noticias])

  //.catch( error => setExisteDados(false))
  const window = useWindowDimensions();

  return (
    <View style={styles.container}>
          
      <ScrollView horizontal={true}>  
        {noticias.map(function(val){        
          return(
            <View key={val.id} style={[styles.card, {width: window.height * 0.177, height: window.height * 0.3}]} >   
              <Modal Imagem={{uri: `${val.foto}`}}
              OpenImagem={{uri: `${val.foto}`}}/> 
            </View>          
            )
        })}
      </ScrollView>    
    </View>   
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor:'white', 
  },

  card: {
    marginVertical: 8,
    marginHorizontal: 6,
    backgroundColor:'#D9D9D9',
    borderRadius: 13,
  },
  

});

export default CarrosselMemoria;