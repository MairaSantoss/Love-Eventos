
import { StyleSheet, Text} from 'react-native';

const Politica = () =>{
  return (

    <Text style={styles.texto}>Termos e Políticas</Text>
 
  );
}

const styles = StyleSheet.create({

  texto:{
      fontWeight:'bold',
      fontSize: 11,  
      textTransform:'uppercase',
      color: '#F24141',
    },

});

export default Politica;