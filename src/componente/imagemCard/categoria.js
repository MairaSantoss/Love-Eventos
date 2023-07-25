
import {StyleSheet, View, Image, useWindowDimensions, Text} from 'react-native';

const Categoria = ({foto, texto}) =>{
  
  const window = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={[styles.card, {height: window.height * 0.08, width: window.height * 0.08}]} >             
          <Image style={[styles.imagem,{height: window.height * 0.08, width: window.height * 0.08}]} source={{uri: foto}} />                                                  
      </View> 
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginRight: 7,
    alignItems:"center",
    marginBottom: 6
  },

  card: {
    backgroundColor:'#D9D9D9',
    borderRadius: 130,     
  },

  imagem:{
    borderRadius: 130, 
  },

  texto:{
    textTransform:'uppercase',
    fontSize: 11,
    textAlign:'center'
  }
});

export default Categoria;