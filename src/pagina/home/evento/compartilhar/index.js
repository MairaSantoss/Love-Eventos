import React, {useEffect,useState}from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView, Share} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import Foto from '../../../../componente/imagemCard/evento';
import Topico from '../../../../componente/texto/textoNegrito';
import Descricao from '../../../../componente/texto/descricaoEvento';
import _StatusBar from '../../../../componente/statusBar/statusBar';
export default function Compartilhar({route}) {
  
  const site = "https://zevip.com.br/download";


  const onShare = async () => {
    try {
      
      const result = await Share.share({message: route.params.titulo  + route.params.descricao + site});
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
    }
  };

  return (
  <View style={styles.container}> 
    <_StatusBar/>
    <ScrollView showsVerticalScrollIndicator={false}> 
      <Foto foto={route.params.foto}/>
        <View style={{margin: 10}}>      
          <Text style={styles.titulo}>{route.params.titulo}</Text>
          <Topico texto={"Descrição do Evento"}/>
          <Descricao texto={route.params.descricao}/>

          <Topico texto={""}/>

          <View style={{flexDirection:'row', justifyContent:'center' }}>
            <FontAwesome5 name="facebook-square" size={15} color="rgb(59, 89, 152)" style={{margin: 5}}/>        
            <FontAwesome5 name="instagram-square" size={15} color="rgb( 255, 25, 119)" style={{margin: 5}}/>
            <FontAwesome5 name="twitter-square" size={15} color="#00acee" style={{margin: 5}} />
            <FontAwesome5 name="whatsapp-square" size={15} color="rgb(52, 175, 35)" style={{margin: 5}} />
          </View>

          <View style={{justifyContent:'center', flexDirection:"row" }}>
            
            <Pressable onPress={onShare} style={styles.compartilhe}>
              <Text style={styles.texto}>Compartilhe</Text>
              <Entypo name="share" size={20} color="#9A9A99" />        
            </Pressable>                                                                             
          </View>            
        </View>    
    </ScrollView>
  </View>

  );
}

const styles = StyleSheet.create({
  container: {                                      
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'center',
  },

titulo:{
  fontSize: 25,
  fontWeight:'bold',
  textTransform: 'uppercase'
},

compartilhe:{
  paddingVertical: 6,  
  paddingHorizontal: 20,                               
  backgroundColor: "white",
  flexDirection:'row',
  justifyContent:'center',
  borderRadius: 7,
  marginTop: 10,
  borderWidth: 1,
  borderColor:"#9A9A99"
},

texto:{
  color:'#9A9A99',
  marginRight: 5,
  fontSize: 15
}

});
