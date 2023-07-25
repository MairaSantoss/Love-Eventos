
import { StyleSheet, Text} from 'react-native';

const TextoGrande = ({texto}) =>{
  return (

    <Text style={styles.texto}>{texto}</Text>
 
  );
}

const styles = StyleSheet.create({

  texto:{
      fontSize: 11,  
      textTransform:'uppercase',
    },

});

export default TextoGrande;