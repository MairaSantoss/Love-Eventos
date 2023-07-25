import React from "react";
import {StyleSheet,View,Image, useWindowDimensions} from "react-native";

const Perfil = ({tamanho, foto}) => {

  const window = useWindowDimensions();
  return (
                
      <View style={[styles.card2, {height: window.height * tamanho , width: window.height * tamanho}]} >             
          <Image style={[styles.imagem, {height: window.height * tamanho , width: window.height * tamanho}]} source={{uri: foto}} />                                                  
      </View>               

   
  );
}

const styles = StyleSheet.create({

  card2: {
    backgroundColor:'#D9D9D9',
    borderRadius: 130, 
  },

 imagem:{
    borderRadius:130,
 }
});

export default Perfil;