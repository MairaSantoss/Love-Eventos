
import { StyleSheet, Text, View} from 'react-native';

const DadosPerfil = ({nome, email}) =>{
  return (
   <View style={styles.container}>
    <Text style={styles.texto}>{nome}</Text>
    <Text style={styles.textoEmail}>{email}</Text>
    <Text style={styles.apagar}>Apagar meu perfil</Text>
  </View> 
  );
}

const styles = StyleSheet.create({

  container:{
    marginLeft: 8
  },

  texto:{
      fontWeight:'bold',
      fontSize: 13,  
      textTransform:'uppercase',
    },

  textoEmail:{
    fontSize: 11,  
  },

  apagar:{
    fontSize: 13, 
    color:'#F24141'
  }
});

export default DadosPerfil;