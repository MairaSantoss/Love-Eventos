import React,{useState} from "react";
import {Text,StyleSheet,View,Image, useWindowDimensions, Pressable} from "react-native";
import Api from '../../service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Carrossel = ({id, foto, cidade, titulo, semana, mes, dia, descricao, corLike}) => {
  const window = useWindowDimensions();
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const sessao_in = async () => {
    let usuario = null;
    let id = null;
    try {usuario = await AsyncStorage.getItem('user') || null;
        id = await AsyncStorage.getItem('id') || null;}
    catch (error) {} 
      setUser(usuario);
      setIdUser(id);}

  function Like(idEvento){
    sessao_in().then(seLogadoLikeDeslike(idEvento))
    .catch(error => {}); }

  function seLogadoLikeDeslike(idEvento){
      if(user != null  || idUser != null ){ // se user logado
      const data = {
        request: "likeDeslike",
        idEvento: idEvento,
        idUser: idUser, };
      Api .put('/controll/event.php', data)
      .then().catch(error => {}); }
      else{}
    }

    function corHeart(){
      if(corLike == 0){
      return(
        <View>
          <FontAwesome name="heart-o" size={17} color="#9A9A99"/>
        </View> )}
      else{
        return(
      <View>
        <FontAwesome name="heart" size={17} color="#F24141"/>
      </View>)}} 

  return (
    <View style={styles.container}>
            <Pressable  key={id} onPress={() => navigation.navigate('Detalhe do evento', {id})}>
              <View style={styles.evento}>         
                  <View style={[styles.card1, {height: window.height * 0.16}]}>               
                      <View style={{marginTop: 3}}>
                        <Text style={{textTransform:'uppercase', fontSize: 11}}>{semana}</Text>
                        <Text style={{fontWeight:'bold', marginTop: -5}}>{dia}</Text>
                        <Text style={{marginTop: -5, marginBottom: 7}}>{mes}</Text>
                      </View>              
                      <View style={{marginBottom: 3}}>

                      <Pressable onPress={()=>Like(id)}>
                      {corHeart()}
                      </Pressable> 

                        <Pressable onPress={() => navigation.navigate('Compartilhar evento', {id, titulo, descricao, foto})}>
                          <Ionicons name="ios-arrow-redo-sharp" size={19} color="#9A9A99"  style={{marginTop: 2}}/>    
                        </Pressable>    
                      </View>               
                  </View>

                  <View style={[styles.card2, {height: window.height * 0.16 , width: window.width * 0.32}]} >    
                    <View>         
                      <Image style={[styles.imagem, {height: window.height * 0.096 , width: window.width * 0.32}]} source={{uri: `${foto}` }} />
                    </View>
                    <View style={{marginBottom: 3.5}}>
                      <Text style={styles.titulo}>{titulo}</Text>    
                      <View style={{flexDirection:'row'}}>
                          <FontAwesome5 name="location-arrow" size={7} color="#F24141" style={{marginTop:3, marginRight:1}} />
                          <Text style={styles.cidade}>{cidade}</Text>
                      </View>   
                    </View>                                                 
                </View>
              </View>
            </Pressable>  
    </View>  
  );
}

const styles = StyleSheet.create({

  card2: {
    backgroundColor:'white',
    borderBottomRightRadius:10,
    borderTopRightRadius: 10,
    justifyContent:'space-between'
  },

  card1:{
    paddingLeft: 5,
    paddingRight: 5, 
    backgroundColor:'white', 
    borderBottomLeftRadius:10,
    borderTopLeftRadius: 10, 
    justifyContent:'space-between',
  },

  evento:{
    flexDirection:'row',
    margin: 6,
    shadowColor: "black",
    borderRadius: 10,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4
  },
  
 titulo:{
    fontSize: 11,
    fontWeight:'bold',
    lineHeight: 10,
    paddingTop: 4,
    paddingLeft: 1
 },

 cidade:{
    fontSize: 9,
    lineHeight:8,
    paddingTop:2,
    marginTop:2
 },

 imagem:{
    borderTopRightRadius:10,
 }
});

export default Carrossel;