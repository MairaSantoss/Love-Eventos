import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import _StatusBar from '../../../componente/statusBar/statusBar';
import Botao from '../../../componente/botao/botaoTriboon';

export default function SejaComercial({navigation}) {
  return (
  <View style={styles.container}> 
    <_StatusBar/>
    <Text style={styles.texto}> 
      <Text style={{fontWeight:'bold'}}>
        ANTES DE CRIAR SEU EVENTO, PRECISAMOS
        CADASTRAR O SEU PERFIL COMERCIAL. </Text>
     </Text> 

     <Text style={styles.texto}> 
        COM O PERFIL COMERCIAL, VOCÊ PODERÁ
        GERENCIAR EVENTOS E MUITO MAIS.
     </Text> 

    <Pressable onPress={() => navigation.navigate("Cadastro comercial")}>
        <Botao 
        cor={"#F24141"}
        texto={"Vamos Começar"}
        />
    </Pressable>  
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
  fontSize: 13,
  textAlign:'center',
  color:"#000000",
  marginHorizontal:"10%",
  marginBottom: "8%" }
 
});
