import React,{useState} from 'react';
import { StyleSheet, View , Text, Pressable} from 'react-native';
import Slider from '@react-native-community/slider';


const Distancia = () => {
  const [distancia, setDistancia] = useState(5);

return (   
  <View>
    <Text style={styles.km}>{Math.floor(distancia)} Km</Text>
    <Slider
      style={{height: 40}}
      minimumValue={0}
      maximumValue={300}
      minimumTrackTintColor="#F24141"
      maximumTrackTintColor="#E7E0E0"
      thumbTintColor='#F24141'
      
      onValueChange={(value)=>setDistancia(value + 5)}    
    />                     
</View>

  );
}

const styles = StyleSheet.create({

  km:{
    textAlign: "center",
    fontSize: 20,
    fontWeight:'bold'
  }
    
});

export default Distancia;