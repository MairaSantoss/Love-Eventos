import React, { useState } from 'react';
import Slider from '@react-native-community/slider';

import { StyleSheet, View, Text} from 'react-native';

const InteresseBlock = () => {

  return (
    <View style={styles.container}>              
        <Slider
          style={{height: 40}}
          minimumValue={0}
          maximumValue={3.8}
          minimumTrackTintColor="#F24141"
          maximumTrackTintColor="#E7E0E0"
          thumbTintColor="#F24141"  
          disabled={true}          
        />

      <View style={{flexDirection:'row'}}>
        <View style={{width:"25%"}}>
        </View>
         <View style={{width:"25%"}}>
          <Text style={styles.cor}>Baixo</Text>  
        </View> 
         <View style={{width:"25%"}}>
            <Text style={styles.cor}>Talvez</Text>  
        </View> 
        <View style={{width:"25%"}}>
          <Text style={styles.cor}>Presença Confirmada</Text>  
        </View>       
      </View>         
   </View>
   );   
}

const styles = StyleSheet.create({
    container: {  
        flex:1,
        marginLeft: 10,
        marginRight: 10,     
        justifyContent: 'center',
    },

    cor:{
    textTransform:'uppercase',
    fontSize:11
    }
});

export default InteresseBlock;