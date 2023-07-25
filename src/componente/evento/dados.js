
import React from "react";
import {Text,StyleSheet,View, Pressable} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Dados = ({data, titulo,rua, local, horaInicial, horaFinal, interessado, like, numero, bairro, cidade, estado, latitude, longitude}) => {
  const navigation = useNavigation();
  return (
    <View>
        <Text style={styles.titulo}>{titulo}</Text>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 10}}>
          <View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <FontAwesome5 name="location-arrow" size={12} color="#9A9999" style={{marginRight:3}} />
                <Text style={styles.texto}>{local}</Text>
            </View>
            <Text style={styles.TextoSimples}>{rua}, {numero} {bairro}</Text>
            <Text style={[styles.TextoSimples, {marginTop: -3.5}]}>{cidade} {estado}</Text>
          </View>

          <Pressable onPress={() => navigation.navigate('Mapa',{latitude ,longitude})}>
            <FontAwesome5 name="map-marked-alt" size={23} color="#F24141" style={{marginLeft: 2}}/>
            <Text style={{fontSize: 7, textAlign:'center'}}>Ver trajeto</Text>
          </Pressable>

        </View>

        <View style={{flexDirection:'row', marginTop: 8,  alignItems:'center'}}>
          <Ionicons name="ios-time" size={12.5} color="#9A9999" style={{ marginRight:3}}/>
          <Text style={styles.texto}>{data}</Text>
        </View>
        <Text style={styles.TextoSimples}>{horaInicial} às {horaFinal}</Text>

        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          <View style={[styles.engajamento, {marginRight: 20}]}>
            <FontAwesome name="handshake-o" size={22} color="black" />
            <View style={{flexDirection:'row', marginLeft: 8}}>
              <Text style={styles.texto}>{interessado}</Text>
              <Text style={styles.TextoSimples}>  Interessados</Text>
            </View>
          </View>
          <View style={styles.engajamento}>
            <FontAwesome name="heart" size={19} color="#F24141"  />
            <View style={{flexDirection:'row', marginLeft: 8}}>
              <Text style={styles.TextoSimples} >{like}</Text>
              <Text style={styles.TextoSimples}>  Likes</Text>
            </View>
          </View>
        </View>
    </View>  
  );
}

const styles = StyleSheet.create({

      TextoSimples: {
        fontSize: 11,
      },   

      titulo:{
        fontSize: 25,
        fontWeight:'bold',
        textTransform: 'uppercase'
      },  

      texto:{
        fontWeight:'bold',
        fontSize: 11,  
        textTransform:'uppercase', 
      },

      engajamento:{
        flexDirection:'row', 
        alignItems:'center',
        marginTop: 10,
      }    
    });
      
export default Dados;


