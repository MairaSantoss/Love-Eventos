
import { StyleSheet, Text} from 'react-native';

const TituloMedio = ({texto}) =>{
  return (

    <Text style={styles.texto}>{texto}</Text>
 
  );
}

const styles = StyleSheet.create({

  texto:{
    fontWeight:'bold',
    textTransform:'uppercase',
    fontSize: 20,
    },

});

export default TituloMedio;