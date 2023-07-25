
import {StyleSheet, View, Text, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Texto from '../texto/texto';
import Titulo from '../texto/tituloEvento';


const MeusEventos = ({titulo, data, hora, status, cor}) =>{
  const navigation = useNavigation();
return (
    <View  style={styles.container}>
        <View style={styles.evento}>
            <Titulo texto={titulo}/>
            <View style={{flexDirection: "row"}}>
                <Texto texto={data}/>
                <Text style={[{marginLeft: 15}, styles.status]}>{hora}</Text> 
            </View>
            <Text style={[{color:`${cor}`}, styles.status]}>{status}</Text>
        </View>
        <Pressable style={styles.lixeira} onPress={() => navigation.navigate("Cancelar Evento")}>
          <MaterialCommunityIcons name="delete" size={28} color="white" />       
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flexDirection:'row',
      width:'100%',
      marginVertical: 4,
      height: 70,

    },

  evento:{
    paddingLeft: 18,
    alignItems:'flex-start',
    backgroundColor:'#F5F5F5',
    justifyContent:'center',
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13 ,
    width:'85%',
    height: '100%'
  },

  lixeira: {
    backgroundColor:'#E90606',
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13 ,
    justifyContent:'center',
    alignItems:"center",
    width:'15%'
  },


  status:{
    fontSize: 11,  
    textTransform:'uppercase',
  }
});

export default MeusEventos;