import React, { useState, useEffect} from "react";
import {ScrollView,View, Text} from "react-native";
import Moment from 'moment';
import Api from '../../service/api';
import CarrosselDestaque from '../evento/cardCarrosselDestaque';


const CarrosselEsporte = ({idUser, latitude, longitude}) => {

  const [evento, setEvento] = useState([]);
  const [existeDados, setExisteDados] = useState(true);
  useEffect(()=>{ 
    const data = {
      request: "read",
      idUser: idUser,
      latitude: latitude,
      longitude: longitude,
      carrossel: 3 };
    Api .put('/controll/event.php', data)
    .then(function(res){
      if ((res.data).length === 0) 
        setExisteDados(false)
      else{ setExisteDados(true) }
    setEvento(res.data);  })     
    .catch( error => setExisteDados(false))
    },[evento])

return (
  existeDados ?
  <View>
    <Text style={{fontWeight:'bold'}}>ESPORTES</Text>
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
          foto={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}
          cidade={val.cidade}
          descricao={val.descricao}
          corLike = {val.corLike}/>       
        </View>
            )
          })}
    </ScrollView>
  </View>  :
  <View>
    <Text style={{fontWeight:'bold'}}>ESPORTES</Text>
    <Text> Tupi guarani hulu huh uhuhu </Text>
  </View>
  );
}

export default CarrosselEsporte;