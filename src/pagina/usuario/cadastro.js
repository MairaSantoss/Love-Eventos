import React from 'react';
import { StyleSheet, View, ScrollView, Pressable, Text} from 'react-native';

import _StatusBar from '../../componente/statusBar/statusBar';
import Botao from '../../componente/botao/botaoTriboon';
import Politica from '../../componente/texto/PoliticaTermo';
import InputNumber from '../../componente/formulario/textInputNumber';
import Input from '../../componente/formulario/textInput';
import Upload from '../../componente/formulario/uploadFotoPerfil';


export default function Cadastro() {
  return (
<View style={styles.container}>
    <_StatusBar/>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Upload texto={"Foto Perfil"}/>
      <View style={{marginHorizontal:'3%', marginTop: 15}}> 
        <Input placeholder={"Nome"}
        largura={"98%"} />
        <Input placeholder={"Sobrenome"}
        largura={"98%"}/>
        <InputNumber placeholder={"CPF/CNPJ"}
        largura={"98%"}/>
        <InputNumber placeholder={"Celular"}
        largura={"98%"}/>
        <Input placeholder={"E-mail"}
        largura={"98%"}/>

        <View style={{marginTop: 30}}>
          <Input placeholder={"Senha"}
          largura={"98%"}/>
          <Input placeholder={"Confirmar senha"}
          largura={"98%"}/>
        </View>

        <View style={styles.politica}>
          <Text style={styles.texto}>Ao clicar em solicitar cadastro, concorda com os <Text><Politica/></Text></Text>
        </View>

        <View style={{marginBottom: 20}}>
          <Botao 
          cor={"#F24141"}
          texto={"solicitar cadastro"}/>
         <Pressable>
          <Botao 
          cor={"#9A9A99"}
          texto={"sair"}
          />
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
  
  },

  texto:{
    fontWeight:'bold',
    fontSize: 11,  
    textTransform:'uppercase',
  },

  politica:{
    marginHorizontal:"15%", 
    textAlign:'center',
    marginVertical: 30
  }

});
