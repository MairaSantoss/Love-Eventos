//Import App e localização atual
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
//icones Abas       
import { Fontisto } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';  
//React navegação
import {NavigationContainer} from '@react-navigation/native';  
import {createStackNavigator} from "@react-navigation/stack"; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
//Rotas
import Home from "./src/pagina/home/home/";
import Detalhe from "./src/pagina/home/evento/detalhe/";
import Compartilhar from "./src/pagina/home/evento/compartilhar/";
import Filtrar from "./src/pagina/filtro/";
import PorPerto from "./src/pagina/porPerto/";
import Perfil from "./src/pagina/perfil/";
import FacaLogin from "./src/pagina/usuario/facaLogin";
import Cadastro from "./src/pagina/usuario/cadastro";
import CadastroComercial from "./src/pagina/comercial/conta/cadastro";
import SejaComercial from "./src/pagina/comercial/conta/sejaPerfilComercal";
import CadastroEvento from "./src/pagina/comercial/evento/cadastro";
import MeusEventos from "./src/pagina/comercial/evento/meusEventos";
import CancelarEvento from "./src/pagina/comercial/evento/cancelarEvento";
import Login from "././src/pagina/usuario/sessao/login";
//rota 
import VerMapa from "././src/componente/mapa/mapaObterLocalizacao";
import MapaEventos from '././src/pagina/porPerto/mapaComEventos';

const Stack = createStackNavigator();
const Abas = createBottomTabNavigator();

const _Home = () => {
  return (
  <Stack.Navigator>
    <Stack.Screen name="_Home" component = { Home} options={{headerShown:false}} />
    <Stack.Screen name="Detalhe do evento" component = { Detalhe } />
    <Stack.Screen name="Compartilhar evento" component = { Compartilhar } />
  </Stack.Navigator>
  )}

const Main = () => {
  return (
  <Abas.Navigator
    screenOptions={{       
      tabBarStyle: {backgroundColor: "#ffff", height: 54},
      tabBarLabelStyle: {fontSize: 15, marginBottom: 4, fontSize: 12 },
      tabBarActiveTintColor: "#F24141",       
    headerStyle:{
      backgroundColor: 'pink',
      height: 100,
    },
    headerTitleStyle:{
      color: 'orange',
      fontSize: 30,
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center', headerShown: false 
  }}
  >
    <Abas.Screen 
        name="Home" 
        component = { _Home }
        options={{
        tabBarIcon: ({color}) =>(<Fontisto name="home" size={22} color={color}/>)
        }}
      />
    <Abas.Screen 
        name="Por Perto" 
        component = { PorPerto }
        options={{
        tabBarIcon: ({color}) =>(<Foundation name="magnifying-glass" size={25} color={color}/>)
        }}
      />
      <Abas.Screen 
        name="Filtrar" 
        component = { Filtrar }
        options={{
        tabBarIcon: ({color}) =>(<Foundation name="filter" size={25} color={color}/>)
        }}
      />
      <Abas.Screen 
        name="Perfil" 
        component = { Perfil }
        options={{
        tabBarIcon: ({color}) =>(<FontAwesome name="user-circle" size={22} color={color}/>)
        }}
      />
  </Abas.Navigator>)}

  export default function App () {
  //PEGANDO LOCALIZAÇÃO ATUAL DO USUARIO EM PRIMEIRA INSTANCIA
  useEffect(()=>{ 
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const location = await Location.getCurrentPositionAsync({})
      sessao_start( `${location.coords.latitude}`, `${location.coords.longitude}` );
    })(); 
  });

const sessao_start = async (latitude, longitude) => {
  try {
    await AsyncStorage.setItem('lat', latitude);
    await AsyncStorage.setItem('long', longitude);
  } catch (error) {
  console.log(error.message);
  }}
  //retorna rotas do app
  
  return (
  <NavigationContainer >     
      <Stack.Navigator>
          <Stack.Screen name="Login" component = {Login} options={{headerShown:false}} />
        <Stack.Screen name="Main" component = {Main} options={{headerShown:false}} />
        <Stack.Screen name="Faça Login" component = {FacaLogin} />
        <Stack.Screen name="Cadastro" component = {Cadastro} />
        <Stack.Screen name="Cadastro comercial" component = {CadastroComercial} />
        <Stack.Screen name="Seja um perfil comercial" component = {SejaComercial} />
        <Stack.Screen name="Novo Evento" component = {CadastroEvento} />
        <Stack.Screen name="Meus Eventos" component = {MeusEventos} />
        <Stack.Screen name="Cancelar Evento" component = {CancelarEvento} />
        <Stack.Screen name="Mapa" component = {VerMapa} options={{headerStyle:{height: 45,}, headerTitleStyle:{ color: 'white',},}} />
        <Stack.Screen name="MapaEventos" component = {MapaEventos} options={{headerStyle:{height: 45,}, headerTitleStyle:{ color: 'white',},}} />
      </Stack.Navigator> 
    </NavigationContainer>  
  )
};

