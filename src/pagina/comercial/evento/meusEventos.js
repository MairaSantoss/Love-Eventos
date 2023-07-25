import React from 'react';
import { StyleSheet, View, ScrollView, Pressable, Text} from 'react-native';



import _StatusBar from '../../../componente/statusBar/statusBar';
import Evento from '../../../componente/evento/meusEventos';
import Select from '../../../componente/formulario/select';


export default function MeusEventos() {
  return (
<View style={styles.container}>
   <View style={{margin: 10}}>
    <_StatusBar/>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Select/>
     <Evento titulo={"Arraía parque Cedral"} 
            data={"Sabado 16 julho de 2022"}
            hora={"14h - 19h"}
            status={"Em andamento"}
            // em andamento
            cor={"#4153F2"}
           />
      <Evento titulo={"Festa do Branco"} 
              data={"Sabado 16 julho de 2022"}
              hora={"14h - 19h"}
              status={"Cancelado"}
              // cancelado
              cor={"#E90606"}
      />
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
