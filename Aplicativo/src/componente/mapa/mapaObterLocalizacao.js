import * as React from 'react';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function Mapa({route}) {

parseFloat(route.params.latitude) 
const meuponto = {
//-22.11773094414637, -51.38502912882885
latitude: parseFloat(route.params.latitude),
longitude: parseFloat(route.params.longitude),
latitudeDelta: 0,
longitudeDelta: 0,                     
};

return (
<View style={styles.container}>
<MapView style={styles.map} initialRegion={meuponto}>
<Marker coordinate={meuponto} pinColor="red"  />
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
});

