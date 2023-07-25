import { StyleSheet, View, Pressable, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const Hora = ({largura, texto}) => {


  return (
    <View style={{width: largura}}> 
      <Pressable style={styles.sessao}>
            <Text style={{marginRight: 20}}> {texto} </Text>
            <Ionicons name="time-sharp" size={24} color="black" />    
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({

  sessao: {
    flexDirection: 'row',
    backgroundColor:'#F9F8F8', 
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal: 6,
    paddingLeft: "2%",
    paddingVertical: 6.5,
    borderRadius: 5,
    marginVertical:'1%',
    marginHorizontal:'1%', 
  },
    
});

export default Hora;