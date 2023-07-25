
import { StyleSheet, View} from 'react-native';

const Linha = () =>{
  return (
    <View style={styles.linha}></View>
  );
}

const styles = StyleSheet.create({

linha:{
    backgroundColor:'#D2D2D2',
        width:'70%',
        padding: 0.20, 
        alignSelf:'center',
        marginTop: 8
    },
  
});

export default Linha;