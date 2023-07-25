
import { StyleSheet, Text, View } from 'react-native';

const Botao = ({cor, texto}) =>{
  return (
    
        <View style={[styles.botao, {backgroundColor:`${cor}`}]}>
           <Text style={[styles.textoBotao, {color:'white'}]}>{texto}</Text>
        </View>    
  );
}

const styles = StyleSheet.create({


  textoBotao:{
    textAlign:'center',
    fontSize: 11,
    textTransform:'uppercase'
  },

  botao:{
    paddingVertical:15,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: "3.5%",
    
  },

});

export default Botao;