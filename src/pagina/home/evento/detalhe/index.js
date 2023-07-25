import React,{useEffect,useReducer,useState} from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import Api from '../../../../service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import 'moment/locale/pt-br';
import _StatusBar from '../../../../componente/statusBar/statusBar';
import CarrosselInteressados from '../../../../componente/carrossel/carrosselInteressados';
import Interesse from '../../../../componente/seletor/interesse';
import InteresseBlock from '../../../../componente/seletor/interesseBlock';
import FotoEvento from '../../../../componente/imagemCard/evento';
import Topico from '../../../../componente/texto/textoNegrito';
import Linha from '../../../../componente/decoracao/linha';
import Descricao from '../../../../componente/texto/descricaoEvento';
import Dados from '../../../../componente/evento/dados';

export default function Detalhe({navigation, route}) {

  const [evento, setEvento] = useState([]);
    useEffect(()=>{ 
      const data = {
        request: "select",
        idEvento: `${route.params.id}`,
      };  Api .put('/controll/event.php', data)
        .then(function(res){
        setEvento(res.data);    
       // console.log(evento);      
        sessao_in();  
        })  },[evento])

    function estaLogado(){     
      if( idUser != null || user !=null ){
        return (
        <View>  
          <Interesse idUser_={idUser} idEvento_={route.params.id}/>
        </View>); } 
      else{return (
        <View>
          <Pressable onPress={() => navigation.navigate("Faça Login")}>
            <Text style={styles.realizeLogin}>* Realize login para utilizar esse recurso.</Text>
            </Pressable>   
          <InteresseBlock/>
      </View>); }}

    const [idUser, setIdUser] = useState([]);
    const [user, setUser] = useState('');
    const sessao_in = async () => {
      let usuario = null;
      let id_ = null;
      try {
          usuario = await AsyncStorage.getItem('user') || null;
          id_ = await AsyncStorage.getItem('id') || null;
      } catch (error) {
      } 
      setUser(usuario);setIdUser(id_); }
                  
return (
<View style={styles.container}> 
  {evento.map(function(val){        
    return(
    <View key={val.id}> 
      <_StatusBar/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FotoEvento foto={route.params.foto}/>      
        <View style={{margin: 10}}>  
          <Dados
            data = {Moment(val.dataInicial).format('dddd LL')}    
            rua={val.rua}
            local={val.local}
            titulo={val.titulo}
            horaInicial={Moment(val.horaInicial).format('HH:mm')} 
            horaFinal={Moment(val.horaFinal).format('HH:mm')} 
            cidade={val.cidade}
            estado={val.estado}
            numero={val.numero}
            bairro={val.bairro}
            interessado={`${val.interesse}`}
            like={`${val.like}`}
            longitude={val.longitude}
            latitude={val.latitude}          
          />
      
          <CarrosselInteressados interessado={val.interessados}/>        
          <Linha/>
          <Topico texto={"Descrição do Evento"}/>
          <Descricao texto ={val.descricao}/>
          <Topico texto={"Medidor de Interesse"}/>          
          <View>
            {estaLogado()}
          </View>
          <Topico texto={"Organizador"}/>
          <View style={{flexDirection:'row', alignItems:'center'}}>     
            <Image style={styles.organizadorImagem} source={{uri: `${val.foto}` }} />
            <Text style={[styles.TextoSimples,{fontWeight:'bold', marginLeft:5}]}>{val.organizador}</Text>
          </View>     
        </View>
      </ScrollView>              
    </View>
  )})}
</View>
  );
}

const styles = StyleSheet.create({

container: {
  flex: 1,
  backgroundColor:'white',
  justifyContent: 'center',
},

TextoSimples: {
  fontSize: 11,
},

organizadorImagem:{
  borderRadius: 130,
  backgroundColor:'#D9D9D9',
  width: 33,
  height: 33
},

realizeLogin:{
  color:"#F24141",
  fontSize:10,
  marginTop: -5

}
});
