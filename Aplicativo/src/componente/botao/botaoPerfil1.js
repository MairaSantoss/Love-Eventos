
import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons'; 
const BotaoPerfil1 = ({cor, texto, icon, corTexto, corIcon}) =>{
  return (
    
        <View style={[styles.botao, {backgroundColor:`${cor}`}]}>
         <Ionicons name={`${icon}`} size={22} color={`${corIcon}`} style={styles.icon}/>
           <Text style={[styles.textoBotao, {color: `${corTexto}` }]}>{texto}</Text>
        </View>    
  );
}

const styles = StyleSheet.create({


  textoBotao:{
    textAlign:'center',
    fontSize: 13,
    marginLeft: 13
  },

  botao:{
    paddingVertical:15,
    alignItems:'center',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: "9%",
    flexDirection:'row',
    shadowOffset: {
        width: 3,
        height: 3
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 3
  },

  icon:{
    marginLeft: 18
  }

});

export default BotaoPerfil1;