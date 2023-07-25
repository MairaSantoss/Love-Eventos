import React,{useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../service/api';
import { StyleSheet, View, Pressable} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import _StatusBar from '../../componente/statusBar/statusBar';
import Perfil from '../../componente/imagemCard/perfil';
import DadosPerfil from '../../componente/texto/dadosPerfil';
import Botao from '../../componente/botao/botaoPerfil1';
import Botao_ from '../../componente/botao/botaoPerfil';
import Linha from '../../componente/decoracao/linha';
import Login from '../usuario/sessao/loginn';

export default function _Perfil({navigation}) {


  const [privilegio, SetPrivilegio] = useState();
  const [user, setUser] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const sessao_in = async () => {
    let usuario = null;
    let id = null;
    let privilegio = null;
    try {usuario = await AsyncStorage.getItem('user') || null;
        id = await AsyncStorage.getItem('id') || false;
        privilegio = await AsyncStorage.getItem('privilegio') || 'none';}
    catch (error) {} 
      setUser(usuario);
      setIdUser(id);
      SetPrivilegio(privilegio);}

    const [usuario, setUsuario] = useState([]);
    function dadosPerfil(){
      const data = {
        request: "select",
        idUser: idUser
      };
      Api .put('/controll/participant.php', data)
      .then(function(res){    
        setUsuario(res.data);
      })  
      .catch()
    }

  function ComercianteOuParticipante(){
    if(privilegio == 1){
      return(
      <View>
        <View style={{marginBottom: 15}}>
          <Linha/>
        </View>    
        <Pressable  onPress={() => navigation.navigate("Novo Evento")}>
          <Botao
            icon={"add-circle-sharp"}
            texto={"Novo Evento"}
            corTexto={"#FFFFFF"}
            cor={"#F24141"}
            corIcon={"#FFFFFF"}
          />
        </Pressable>    
        <Pressable  onPress={() => navigation.navigate("Meus Eventos")}>
          <Botao
            icon={"md-calendar"}
            texto={"Meus Eventos"}
            corTexto={"#000000"}
            cor={"#FFFFFF"}
            corIcon={"#F24141"}
          />
        </Pressable>
      </View> ) }
    else if(privilegio == 2){return(<View></View>); }  }

  function temCadastroOuVisitante(){
    sessao_in();
    if(privilegio == 1 || privilegio == 2){
  
      return(
      <View>
        {usuario.map(function(val){ 
          return(
        <View key={val.idParticipante} style={styles.perfil}>      
          <View style={styles.sessao}>          
            <Perfil 
            tamanho={0.08}
            foto={`http://172.16.20.151/`+val.foto}/>
            <DadosPerfil nome={val.nome + " " + val.sobrenome} email={val.email}/>
          </View>                 
             <MaterialIcons name="logout" size={24} color="#A0A0A0" />               
        </View>
        );
      })}
        <View style={styles.opcoes}>
          <Pressable>
            <Botao icon={"ios-heart"}
              texto={"Favoritos"}
              corTexto={"#000000"}
              cor={"#FFFFFF"}
              corIcon={"#F24141"}
            />
          </Pressable>
          <Pressable>
            <Botao_
              icon={"user-edit"}
              texto={"Meus Dados"}
              corTexto={"#000000"}
              cor={"#FFFFFF"}
              corIcon={"#F24141"}
            />
          </Pressable>
          {souParticipante()}
        </View>
        {ComercianteOuParticipante()}
      </View>);}
    if(privilegio == 'none'){
      return(<Login/>);}}

    function souParticipante(){
      if(privilegio == 2){
      return(
        <View>
        <Pressable  onPress={() => navigation.navigate("Seja um perfil comercial")}>
        <Botao
          icon={"add-circle-sharp"}
          texto={"Cadastrar Meu Evento"}
          corTexto={"#FFFFFF"}
          cor={"#F24141"}
          corIcon={"#FFFFFF"}
        />
      </Pressable>
      </View>
      );}
      else{
        <View></View>
      }
    }


return (
  <View style={styles.container}>
    <_StatusBar/>
    {temCadastroOuVisitante()}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  perfil:{
    alignItems:'center',
    flexDirection:'row',
    padding: 15,
    paddingBottom: 25,
    justifyContent:'space-between',
    backgroundColor:'white'
    
  },

  sessao:{
    alignItems:'center',
    flexDirection:'row', 
    justifyContent:'space-between'    
  },

  opcoes:{
    marginTop: 30
  },

});
