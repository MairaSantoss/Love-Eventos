
import { StyleSheet, Text} from 'react-native';

const Descricao = ({texto}) =>{
  return (

    <Text style={styles.descricao}>{texto}</Text>
 
  );
}

const styles = StyleSheet.create({

descricao:{
    textAlign:'justify',
    lineHeight: 14,
    },

});

export default Descricao;