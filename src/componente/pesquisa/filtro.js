import React,{useState} from 'react';
import { StyleSheet, View , TextInput} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 

const Filtro = () => {

 const [usuario, setUsuario] = useState('')

  return (
    <View style={styles.container}> 
      <View style={styles.sessao}>
        <View>
            <FontAwesome5 name="search" size={20} color="#9A9999"  />
        </View>
        <TextInput
            style={styles.input}
            placeholder={"Show, festival, esportes..."}
            value={usuario}
            name="user"
            //onChange={(e)=>setUsuario(e.target.value)}
            />
        <View>
          <Foundation name="graph-horizontal" size={26} color="red"  />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    marginBottom:'1.5%'
  },

  sessao: {
    flexDirection: 'row',
    backgroundColor:'#F9F8F8',  
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal: 6,
    paddingVertical: 4
  },
    
  input: { 
    width:'80%',
  },

});

export default Filtro;