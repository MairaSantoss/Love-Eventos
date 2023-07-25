import React from 'react';
import { StyleSheet, View, ScrollView, Pressable, Text} from 'react-native';



import _StatusBar from '../../../componente/statusBar/statusBar';
import Botao from '../../../componente/botao/botaoTriboon';
import Texto from '../../../componente/texto/textoNegrito';
import Input from '../../../componente/formulario/textInput';
import Textare from '../../../componente/formulario/textare';
import InputNumber from '../../../componente/formulario/textInputNumber';
import Data from '../../../componente/formulario/data';
import Hora from '../../../componente/formulario/hora';
import UploadPerfil from '../../../componente/formulario/uploadFotoPerfil';
import UploadBanner from '../../../componente/formulario/uploadFotoBanner';



export default function CadastroComercial() {
  return (
<View style={styles.container}>
    <_StatusBar/>
    <ScrollView showsVerticalScrollIndicator={false}>
      <UploadPerfil texto={"Banner Principal"}/>
      <View style={{marginHorizontal:'3%', marginTop: 8}}>   
        <Input placeholder={"Nome do evento"}
        largura={"98%"} />


        <Textare placeholder={"Descriçao"}/>
        <InputNumber placeholder={"Limite de participantes"}
        largura={"98%"}/>
          <Texto texto={" Endereço"}/>  
          <InputNumber placeholder={"CEP"}/>
        <View style={{flexDirection:'row', alignContent:'space-between'}}>
            <Input placeholder={"Estado"}
            largura={"20%"}/>   
            <Input placeholder={"Cidade"}
            largura={"76%"}/>  
        </View>    
        <View style={{flexDirection:'row', alignContent:'space-between'}}>
            <Input placeholder={"Rua"}
            largura={"76%"}/>   
            <InputNumber placeholder={"N°"}
            largura={"20%"}/>  
        </View>
     
          <Input placeholder={"Bairro"}
            largura={"98%"}/>  
     

        <Texto texto={" Hora"}/>
        <View style={{flexDirection:'row'}}>        
          <Data largura={"50%"} texto={"Data Início"}/>          
          <Data largura={"49%"} texto={"Data Fim"}/>            
        </View>    

 
        <View style={{flexDirection:'row'}}>
            <Hora largura={"50%"} texto={"Data Início"}/>   
            <Hora largura={"49%"} texto={"Hora Fim"}/>   
        </View>   

        <Texto texto={" Fotos Adicionais"}/> 
        <Text style={styles.textoBreve}> * Em breve</Text>

        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <UploadBanner/>
          <UploadBanner/>
          <UploadBanner/>
        </View> 

        <View style={{marginBottom: 20}}>
          <Botao 
          cor={"#F24141"}
          texto={"cadastrar"}/>
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
  
  },

  textoBreve:{
    fontSize: 10,  
    textTransform:'uppercase',
    color: "#F24141",
    marginTop: -5
  },

  politica:{
    marginHorizontal:"15%", 
    textAlign:'center',
    marginVertical: 30
  }
  

});
