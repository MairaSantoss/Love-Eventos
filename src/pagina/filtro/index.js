import React from 'react';
import { StyleSheet, View, useWindowDimensions, ScrollView } from 'react-native';

import Statusbar from '../../componente/statusBar/statusBar';
import Botao from '../../componente/botao/botaoTriboon';
import BotaoFiltro from '../../componente/botao/botaoFiltro';
import Pesquisa from '../../componente/pesquisa/filtro';
import Texto from '../../componente/texto/textoNegrito';
import Categoria from '../../componente/imagemCard/categoria';
import Distancia from '../../componente/seletor/distancia';

export default function Filtro() {

const window = useWindowDimensions();

return (
<View style={styles.container}>  
   <View style={{margin:10}}>   
     <Statusbar/>
     <ScrollView showsVerticalScrollIndicator={false}>
        <View> 
          <Pesquisa/>
          <Texto texto={"data"}/>
            <View style={{flexDirection:"row"}}>
              <BotaoFiltro Texto={"Todos"}/>
              <BotaoFiltro Texto={"Hoje"}/>
              <BotaoFiltro Texto={"Final de Semana"}/>
            </View>
            <View style={{flexDirection:"row"}}>
              <BotaoFiltro Texto={"Semana"}/>
              <BotaoFiltro Texto={"Este mês"}/>
              <BotaoFiltro Texto={"Escolher Data"}/>
            </View>
          
          <Texto texto={"Categoria"} />
            <View style={styles.categoria}>
            <Categoria
            texto={"todas"}
                foto={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}
              />   
            <Categoria
            texto={"bares"}
                foto={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}
              />      
              <Categoria
              texto={"show"}
                foto={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}
              />  
            <Categoria
            texto={"teatro"}
                foto={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}
              />       
              <Categoria
              texto={"ar livre"}
                foto={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}
              />    
            <Categoria
            texto={"feiras"}
                foto={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}
              />   
            <Categoria
            texto={"crianças"}
                foto={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}
              />      
              <Categoria
              texto={"balada"}
                foto={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}
              />  
            <Categoria
            texto={"cultural"}
                foto={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}
              />   
            <Categoria
            texto={"esporte"}
                foto={"file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540mairasantos%252FTriboon/ImagePicker/d174f1f3-881c-49f6-8661-3d3c387145f1.png"}
              />   
            <Categoria
            style={{position:'absolute'}}
            texto={"Universitário"}
                foto={"file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540mairasantos%252FTriboon/ImagePicker/a8b17af5-2eb6-46af-8824-24a4d7204c94.jpg"}
              />              
              </View>

            <Texto texto={"Distância"} />
              <View style={styles.distancia}>
                <Distancia/>
              </View>
          </View> 
          <View>
            <Botao 
            cor={"#F24141"}
            texto={"APLICAR FILTRO"}/>
            <Botao 
            cor={"#9A9A99"}
            texto={"LIMPAR FILTROS"}
            />
        </View>
      </ScrollView>   
   </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  
  categoria:{
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'center',
    marginVertical: 10
  },


 distancia:{
   justifyContent:"center"
  },

 
});
