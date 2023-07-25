import React, { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import Api from '../../service/api';
import { StyleSheet, View, Text} from 'react-native';


const Interesse = ({idUser_,idEvento_}) => {

  const [interesse, setInteresse] = useState();
  const [InteresseUser, setInteresseUser] = useState([]);

  useEffect(()=>{ 
    const data = {
      request: "getInterestedUser",
      idUser: idUser_,
      idEvento: idEvento_
    };
    Api .put('/controll/event.php', data)
    .then(function(res){ 
      setInteresseUser(parseFloat(res.data.interesse));
    })  
  },[InteresseUser])

  function updateInteresse(){
    const data = {
      request: "UpdateSliderMedidorInteresse",
      idUser: idUser_,
      idEvento: idEvento_,
      comand: interesse,
    };
    Api .put('/controll/event.php', data)
    .then(function(res){
      console.log(res.data);       
    })  
  }
  
    const [corB, setCorB] = useState("black");
    const [corT, setCorT] = useState("black");
    const [corC, setCorC] = useState("black");

    function MedidorInteresse(){}//Não apagar

    function funcaoCor(){
      updateInteresse();
        setCorB("black")
        setCorT("black")
        setCorC("black")
      if(interesse >= 1 && interesse < 2){
          setCorB("#F24141") }
      if(interesse >= 2 && interesse < 3){
        setCorT("#F24141")}
      if(interesse >= 3){
        setCorC("#F24141")}}


        const x = 1;
return (
  <View style={styles.container}>              
      <Slider
        style={{height: 40}}
        minimumValue={0}
        maximumValue={3}
        step={1}
        minimumTrackTintColor="#F24141"
        maximumTrackTintColor="#E7E0E0"
        thumbTintColor="#F24141"
        onSlidingComplete={(valor)=> MedidorInteresse( 
        setInteresse(Math.floor(valor), updateInteresse())
        ) }              
      />

<Text> {InteresseUser}vc precisa arruma as proipredades do slider, pq ele so recebe otouch quando o usuaruio clica{interesse}</Text>
      <View style={{flexDirection:'row'}}>
        <View style={{width:"25%"}}>
          </View>
            <View style={{width:"25%"}}>
            <Text style={[{color: `${corB}` },styles.cor]}>Baixo</Text>  
          </View> 
          <View style={{width:"25%"}}>
            <Text style={[{color: `${corT}`},styles.cor]}>Talvez</Text>  
          </View> 
          <View style={{width:"25%"}}>
            <Text style={[{color: `${corC}`},styles.cor]}>Presença Confirmada</Text>  
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

export default Interesse;