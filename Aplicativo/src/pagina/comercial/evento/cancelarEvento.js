import React from 'react';
import { StyleSheet, View, ScrollView, Pressable, Text} from 'react-native';



import _StatusBar from '../../../componente/statusBar/statusBar';
import Botao from '../../../componente/botao/botaoTriboon';
import Texto from '../../../componente/texto/texto';
import Titulo from '../../../componente/texto/tituloEvento';

import Input from '../../../componente/formulario/textare';



export default function CancelarEvento() {
  return (
<View style={styles.container}>
    <_StatusBar/>
    <ScrollView showsVerticalScrollIndicator={false}>

      <View style={{marginHorizontal:'3%', marginTop: 40}}> 
         <View style={{ alignItems:'center'}}> 
            <Titulo texto={"Arraya Parque Cedral"}/>
              <View style={{flexDirection: "row"}}>
                 <Texto texto="Sabado 16 Julho de 2022"/>
                 <Text style={[{marginLeft: 15}, styles.status]}>14h 18h</Text> 
              </View>
            <Text style={styles.texto}>Informe o motivo de cancelamento</Text>
         </View>  

          <Input placeholder={"O motivo será informado para os participantes..."}/>

            <View style={{marginBottom: 20, marginTop: 20}}>
                <Botao 
                cor={"#F24141"}
                texto={"Cancelar Evento"}/>
                <Botao 
                cor={"#9A9A99"}
                texto={"Sair"}/>
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
    fontSize: 15,  
    textTransform:'uppercase',
    fontWeight:'bold',
    marginVertical: 20
  },

  politica:{
    marginHorizontal:"15%", 
    textAlign:'center',
    marginVertical: 30
  },

  status:{
    fontSize: 11,  
    textTransform:'uppercase',
  }
  
  

});
