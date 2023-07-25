
import { StyleSheet, View} from 'react-native';
import Texto from '../../componente/texto/textoNegrito';
import { Entypo } from '@expo/vector-icons'; 

const ObterLocalizacao = () => {
  return (

    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Entypo name="location-pin" size={18} color="black" />
      <Texto texto={"OBTER POR LOCALIZAÇÃO"}/>
    </View>
     
  );
}

export default ObterLocalizacao;





