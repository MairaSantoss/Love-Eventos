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
        />

          <CarrosselInteressados interessado={val.interessados}/>
  
        <Linha/>
        <Topico texto={"Descrição do Evento"}/>
        <Descricao texto ={val.descricao}/>
        <Topico texto={"Medidor de Interesse"}/>
        <Pressable onPress={() => navigation.navigate("Faça Login")}>
          <Text style={styles.realizeLogin}>* Realize login para utilizar esse recurso.</Text>
        </Pressable>
        <Interesse/>
        <Topico texto={"Organizador"}/>
        <View style={{flexDirection:'row', alignItems:'center'}}>     
          <Image style={styles.organizadorImagem} source={{uri: `${val.foto}` }} />
          <Text style={[styles.TextoSimples,{fontWeight:'bold', marginLeft:5}]}>{val.organizador}</Text>
        </View>     
      </View>
    </ScrollView>              
  </View>
)})}