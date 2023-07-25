import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import _StatusBar from '../../componente/statusBar/statusBar';
import Botao from '../../componente/botao/botaoTriboon';
export default function FacaLogin({navigation}) {
  return (
  <View style={styles.container}>
    <_StatusBar/>
    <Text style={styles.texto}> 
      <Text style={{fontWeight:'bold'}}>
        Faça login, fique por
        dentro das suas tribos
        preferidas, </Text> receba
        notificações e muito mais,
        ou se torne um produtor e
        plublique seus eventos!
     </Text> 
     <View>
        <Botao 
        cor={"#F24141"}
        texto={"LOGIN COM GMAIL"}/>
        <Botao 
        cor={"#4153F2"}
        texto={"LOGIN COM FACEBOOK"}
        />
        <Pressable onPress={() => navigation.navigate("Cadastro")}>
          <Botao 
          cor={"#9A9A99"}
          texto={"CONTA LOCAL"}
          />
        </Pressable> 
     </View>
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
  fontSize: 20,
  textAlign:'center',
  color:"#000000",
  marginHorizontal:"13%",
  marginBottom: "15%" }
 
});
