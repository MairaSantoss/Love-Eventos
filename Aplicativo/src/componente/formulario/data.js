import { StyleSheet, View, Pressable, Text} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

const Data = ({largura, texto}) => {


  return (
    <View style={{width: largura}}> 
      <Pressable style={styles.sessao}>
            <Text style={{marginRight: 20}}> {texto} </Text>
            <FontAwesome5 name="calendar-alt" size={24} color="#BEBABA" />       
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
    paddingVertical: 6.5,
    borderRadius: 5,
    marginVertical:'1%',
    marginHorizontal:'1%', 
  },
    
});

export default Data;