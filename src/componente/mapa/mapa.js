
import { StyleSheet, Image, useWindowDimensions} from 'react-native';


import Mapa from '../../imagem/mapa.png';

export default function _Mapa() {
  const window = useWindowDimensions();
  return (
      <Image source={Mapa} style={{height: window.height * 0.3, width: window.width * 1, alignSelf:'center' }}/>
  );
}

const styles = StyleSheet.create({
  
});
