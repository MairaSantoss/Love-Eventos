
import { StyleSheet, Text} from 'react-native';

const Texto = ({texto}) =>{
  return (

    <Text style={styles.texto}>{texto}</Text>
 
  );
}

const styles = StyleSheet.create({

  texto:{
      fontWeight:'bold',
      fontSize: 11,  
      textTransform:'uppercase',
      marginVertical: "2%"
    },

});

export default Texto;