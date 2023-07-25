import {useState} from 'react';
import {StyleSheet, Pressable, Text, View} from 'react-native';

const BotaoFiltro = ({Texto}) =>{

const [Valor, setValor] = useState("#F9F8F8");
const [ValorTexto, setValorTexto] = useState("black");
const [Condicao, setCondicao] = useState(true);

function Cor(){
  if(Condicao){
    setValor("#F24141")
    setCondicao(false)
    setValorTexto("white")
  }
  if(Condicao !== true){
  setCondicao(true)
  setValor("#F9F8F8")
  setValorTexto("black")
 }
}

  return (

  <View style={{width:'33.33%'}}>
    <Pressable onPress={() => Cor() }
      style={[styles.botao, {backgroundColor: `${Valor}`}]}
    > 
      <Text style={[styles.textoBotao,{color: `${ValorTexto}`}]}>{Texto}</Text> 
    </Pressable>
  </View>

  );
}

const styles = StyleSheet.create({
 
  textoBotao:{ 
    fontSize: 11,
    textTransform:'uppercase',
    textAlign:'center'
  },

  botao:{  
    paddingVertical:8,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: "3.5%", 
  },

});

export default BotaoFiltro;