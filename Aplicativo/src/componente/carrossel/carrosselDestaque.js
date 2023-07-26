import React, { useState, useEffect} from "react";
import {ScrollView,View, Text, Image} from "react-native";
import Moment from 'moment';
import Api from '../../service/api';
import CarrosselDestaque from '../evento/cardCarrosselDestaque';


const CarrosselDestaque_ = ({idUser, latitude, longitude}) => {

  const [evento, setEvento] = useState([]);
  const [existeDados, setExisteDados] = useState(true);
  useEffect(()=>{ 
    const data = {
      request: "read",
      idUser: idUser,
      latitude: latitude,
      longitude: longitude,
      carrossel: 1
    };
    Api .put('/controll/event.php', data)
    .then(function(res){    
      if ((res.data).length === 0) 
        setExisteDados(false)
      else{ setExisteDados(true)}
    setEvento(res.data); })   
    .catch( error => setExisteDados(false))    
    },[evento])

return (
  existeDados ?
  <View>
    <Text style={{fontWeight:'bold'}}>DESTAQUE</Text>
    <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false}>
      {evento.map(function(val){     
   
        return(  
        <View key={val.id}>         
        <CarrosselDestaque 
          id={val.id}
          titulo={val.titulo}   
          semana= {Moment(val.dataInicial).format('ddd')}
          mes= {Moment(val.dataInicial).format('MMM')}
          dia= {Moment(val.dataInicial).format('DD')}
          foto={`http://172.16.20.151/`+val.foto}
          cidade={val.cidade}
          descricao={val.descricao}
          corLike = {val.corLike}/>     
        </View>    
    
            )
          })}
    </ScrollView>
  </View> :
  <View>
    <Text style={{fontWeight:'bold'}}>DESTAQUE</Text>
    <Text> Sem eventos </Text>
  </View>
  );
}

export default CarrosselDestaque_;