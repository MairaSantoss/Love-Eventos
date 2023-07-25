
import {StyleSheet, View, Image} from 'react-native';

const EventoFoto = ({foto}) =>{
  return (
     <View style={styles.EventoImagem}>
        <Image style={{height: 300 , width: '100%'}} source={{uri: foto }} />
      </View>
  );
}

const styles = StyleSheet.create({
  EventoImagem:{
    backgroundColor:'#D9D9D9',
    height: 300 ,
    width: '100%'
  },
});

export default EventoFoto;