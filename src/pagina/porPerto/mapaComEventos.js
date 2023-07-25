import React,{useState, useEffect} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import Api from '../../service/api';
import Foto from '../../../src/imagem/mapa.png';

export default function MapaEventos() {

    const [evento, setEvento] = useState([]);
    const [existeDados, setExisteDados] = useState(true);
    useEffect(()=>{ 
      const data = {
        request: "read",
        idUser: 1,
        latitude:-22.11773094414637,
        longitude:-51.38502912882885,
        carrossel: 2
      };
      Api .put('/controll/event.php', data)
      .then(function(res){
        if ((res.data).length === 0)
          setExisteDados(false);
        else{ setExisteDados(true) }
      setEvento(res.data);  
    })
    .catch( error => setExisteDados(false))   
      },[evento])

      
const meuponto = {
//-22.11773094414637, -51.38502912882885
latitude: parseFloat(-22.11773094414637),
longitude: parseFloat(-51.38502912882885),
latitudeDelta: 0,
longitudeDelta: 0,                     

};
// props git hub
//https://github.com/react-native-maps/react-native-maps/blob/master/docs/marker.md
//https://github.com/react-native-maps/react-native-maps
//link com exemplo top
//imagem
//image={{uri: ''}}

function Fotoo(){
  return( 
  <View stytle={{backgroundColor: "red"}}>
  <Image
  style={styles.img}
    source={Foto}/>
</View>
  );
}

return (
<View style={styles.container}>


<MapView style={styles.map} initialRegion={meuponto} >

{evento.map((evento) => (                                                                         
<Marker 
rotation={-200}
provider={PROVIDER_GOOGLE}
coordinate={{ latitude : parseFloat(evento.latitude) , longitude : parseFloat(evento.longitude) }}
pinColor="red"
isPreselected={true} 
key={evento.titulo}

>

<Callout tooltip>

  <View style={{padding: 15,  alignSelf:'flex-start', backgroundColor:"red"}}>
  <Text>fi</Text>                                   
  <Image 
  style={styles.img}                              
    source={Foto}/>

  </View>
</Callout>

</Marker>

))}

</MapView>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
map: {
width: Dimensions.get('window').width -3,
height: Dimensions.get('window').height - 40,
},

img:{
  width: 150,
  height: 130,
  alignSelf:"flex-start"
}
});

