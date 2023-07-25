
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
const BotaoPerfil = ({cor, texto, icon, corTexto, corIcon}) =>{
  return (
    
        <View style={[styles.botao, {backgroundColor:`${cor}`}]}>
         <FontAwesome5 name={`${icon}`} size={19} color={`${corIcon}`} style={styles.icon} />
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
    elevation: 4
  },

  icon:{
    marginLeft: 18
  }

});

export default BotaoPerfil;