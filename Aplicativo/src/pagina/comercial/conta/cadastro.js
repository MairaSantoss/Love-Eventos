
import React, { useEffect, useState } from 'react';
import * as yup from 'yup'
import { Formik } from 'formik'
import { Alert, StyleSheet, View, ScrollView, Pressable, Text, TextInput, Button, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//multiselect
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
//
import _StatusBar from '../../../componente/statusBar/statusBar';
import Botao from '../../../componente/botao/botaoTriboon';
import Texto from '../../../componente/texto/textoNegrito';
import Politica from '../../../componente/texto/PoliticaTermo';
//import Upload from '../../../componente/formulario/uploadFotoPerfil';
import Localizacao from '../../../componente/mapa/obterLocalizao';
import Axios from 'axios';
import Api from '../../../service/api';

const items = [
  // this is the parent or 'item'
  {
    name: 'Fruits',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Bares',
        id: 1,
      },
      {
        name: 'Show',
        id: 2,
      },
      {
        name: 'Teatro',
        id: 5,
      },
      {
        name: 'Ar livre',
        id: 6,
      },
      {
        name: 'Feiras',
        id: 7,
      },
      {
        name: 'Crianças',
        id: 8,
      },
      {
        name: 'Balada',
        id: 9,
      },
      {
        name: 'Cultural',
        id: 10,
      },
      {
        name: 'Esporte',
        id: 11,
      },
      {
        name: 'Universitário',
        id: 12,
      },
    ],
  }
];


export default function Cadastro({navigation}) {

  const [endereco, setEndereco] = useState([]);
  const [cep, setCep] = useState("");


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


  useEffect(()=>{ 
    sessao_in();
  });

  function buscarCep(){
    const aux = [];
    Axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        const aux = [response.data.bairro, response.data.logradouro, response.data.uf, response.data.localidade];
        setEndereco(aux)  })
      .catch(error => { return; } )}

  
const Alerta = (mensagem) =>{ 
    Alert.alert(       
    "" ,
      mensagem,
      [              
        { text: "Ok" }
      ]
    );      
  }


  const [image, setImage] = useState(null);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,   
      aspect:[1,1],
      quality: 1,    
    });
    if (!result.cancelled) {
      setImage(result.uri);
      return;
    }
  };

  
const [resultado, setResultado] = useState([]);
function Cadastrar (nomeComercial,Instagram, Facebook, Site, num, local) { 
let img = image;
  //if(selectedItems.length == 0) return;
  if(idUser == 0) return;
  let data = {
  request: "createCommercial",
  idUser: idUser,
  nome: nomeComercial,
  bairro: endereco[0],
  rua: endereco[1],
  estado: endereco[2],
  numero: num,
  instagram: Instagram,
  site: Site,
  cidade:endereco[3],  
  facebook: Facebook,
  cep: cep,
  categoria: selectedItems,
  local: local,
  foto: image}      
  Api .post('/controll/commercial.php', data).then(response => response.data.erro ?  
    Alerta("Conta comercial cadastrada.")  :  Alerta("Tivemos um problema para inserir os dados") ).then(() => navigation.navigate("Perfil"));
    console.log("a");
    } 

    const [selectedItems, setSelectedItems] = useState([]);
    const[mensagem, setMensagem] = useState("");
    const[margin, setMargin] = useState(-8);
    onSelectedItemsChange = (selectedItems) => {
    let a = selectedItems.length
    if(a == 0){setMensagem("Escolha no mínimo uma categoria."); setMargin(0); }
    else{ setMensagem("");setMargin(-8);}
    if ( a <= 3) 
      setSelectedItems(selectedItems);
    else return; }

  return (
    <View style={styles.container}>

      <Formik
        initialValues={{ 
          nomeComercial: '' ,
          Instagram:'',
          Facebook:'',
          Site:'',
          rua:'',
          bairro:'',
          estado: '',
          cidade:'',
          cep:'',
          num:'',
          cat:'',
          local:''
        }}
        onSubmit={values => Cadastrar(values.nomeComercial,values.Instagram, values.Facebook, values.Site,values.num, values.local)}
        validationSchema={yup.object().shape({
          nomeComercial: yup
            .string()
            .required("O campo Nome Comercial é obrigatório."),
            Instagram: yup
            .string(),
            Facebook: yup
            .string(),
            Site: yup
            .string()
            .url("Essa URL não é válida."),
            cep: yup
            .string()
            .required("O campo CEP é obrigatório.")
            .min(8, "O CEP deve ter 8 algarismos."),
            num: yup
            .string()
            .required("O campo Número é obrigatório."),
            rua: yup
            .string(),
            bairro: yup
            .string(),
            estado: yup
            .string(),
            cidade: yup
            .string(),
            local: yup
            .string()
            .required("O campo Local é obrigatório."),
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit}) => (
        <View style={styles.container}>
        <_StatusBar/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center',marginTop: 15}}>
            <Pressable onPress={pickImage}>
            <Image source={{ uri: image }} style={styles.imagem} />
            </Pressable>
            <Text style={{fontSize: 11,textTransform:'uppercase',marginTop: 5}}>Perfil</Text>
          </View>
          <View style={{marginHorizontal:'3%'}}> 
            <Texto texto={" Perfil"}/>      
            <TextInput
            style={[styles.input, {width:"98%"}]} 
            placeholder={'Nome Comercial'}
            placeholderTextColor={"black"}
            value={values.nomeComercial}
            onChangeText={handleChange('nomeComercial')} 
            onBlur={() => setFieldTouched('nomeComercial')}
          />
          {touched.nomeComercial && errors.nomeComercial &&
              <Text style={styles.mensagemErro}>{errors.nomeComercial}</Text>
            }

        <View  style={[styles.input, {width:"98%",paddingVertical: 0}]} >
            <SectionedMultiSelect   
              items={items}
              IconRenderer={Icon}    
              uniqueKey="id"
              subKey="children"
              dropDownToggleIconDownComponent={ <MaterialCommunityIcons name="bee-flower" size={32} color="#C0C0C0" style={{marginTop: 10}} />}
              selectText="Categoria"
              selectedText={"Selecionados"}
              showDropDowns={false}
              readOnlyHeadings={true}
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}  
              confirmText="Confirmar"
              searchPlaceholderText={"Pesquisar..."}         
              noResultsComponent={<View style={{justifyContent:"center", alignItems:"center"}}><Text style={{fontSize: 13, textAlign:"center", marginTop: 40, color:"#A9A9A9" }}>Categoria não encontrada...</Text>
              <MaterialCommunityIcons name="bee-flower" size={32} color="#C0C0C0" style={{marginTop: 10}} /></View>}
            />    
          </View>
          <Text style={[ styles.mensagemErro,{margin: margin  }]}>{mensagem}</Text>

          <TextInput
            style={[styles.input, {width:"98%"}]} 
            placeholder={'Instagram'}
            placeholderTextColor={"black"}
            value={values.Instagram}
            keyboardType="email-address"
            onChangeText={handleChange('Instagram')} 
            onBlur={() => setFieldTouched('Instagram')}
          />
            
          <TextInput
            style={[styles.input, {width:"98%"}]} 
            placeholder={'Facebook'}
            placeholderTextColor={"black"}
            value={values.Facebook}
            keyboardType="email-address"
            onChangeText={handleChange('Facebook')} 
            onBlur={() => setFieldTouched('Facebook')}
          />
          <TextInput
            style={[styles.input, {width:"98%"}]} 
            placeholder={'Site'}
            placeholderTextColor={"black"}
            value={values.Site}
            keyboardType="url"
            onChangeText={handleChange('Site')} 
            onBlur={() => setFieldTouched('Site')}
            />

          {touched.Site && errors.Site &&
              <Text style={{ fontSize: 12, color: '#FF0D10'}}>{errors.Site}</Text>
            }

        <Texto texto={" Endereço do Estabelecimento"}/>   
        <TextInput
            style={[styles.input, {width:"98%"}]} 
            placeholder={'Local'}
            placeholderTextColor={"black"}
            value={values.local}
            onChangeText={handleChange('local')} 
            onBlur={() => setFieldTouched('local')}
            blurOnSubmit={true}
          />
          {touched.local && errors.local &&
              <Text style={styles.mensagemErro}>{errors.local}</Text>
            }

          <TextInput
            style={[styles.input, {width:"98%"}]} 
            placeholder={'CEP'}
            placeholderTextColor={"black"}
            value={values.cep}
            keyboardType="numeric"
            onChangeText={handleChange('cep')} 
            onBlur={() => setFieldTouched('cep').then(setCep(values.cep)).then(buscarCep())}
            maxLength={8}
          />


     

        {touched.cep && errors.cep &&
          <Text style={styles.mensagemErro}>{errors.cep}</Text>
        }
              
        <View style={{flexDirection:'row', alignContent:'space-between'}}>      
          <TextInput
          style={[styles.input, {width:"20%"}]} 
          placeholder={'Estado'}
          placeholderTextColor={"black"}
          value={endereco[2]}
          onChangeText={handleChange('estado')} 
          onBlur={() => setFieldTouched('estado')}
          />
          <TextInput
          style={[styles.input, {width:"76%"}]} 
          placeholder={'Cidade'}
          placeholderTextColor={"black"}
          value={endereco[3]}
          onChangeText={handleChange('cidade')} 
          onBlur={() => setFieldTouched('cidade')}
        />
      </View>  

      <View style={{flexDirection:'row', alignContent:'space-between'}}>
          <TextInput
          style={[styles.input, {width:"76%"}]} 
          placeholder={'Rua'}
          placeholderTextColor={"black"}
          value={endereco[1]}
          onChangeText={handleChange('rua')} 
          onBlur={() => setFieldTouched('rua')}
        />
        <TextInput
          style={[styles.input, {width:"20%"}]} 
          placeholder={'N°'}
          placeholderTextColor={"black"}
          value={values.num}
          keyboardType="numeric"
          onChangeText={handleChange('num')} 
          onBlur={() => setFieldTouched('num')}
        />    
      </View>
      {touched.num && errors.num &&
              <Text style={[styles.mensagemErro, { alignSelf:'flex-end'}]}>{errors.num}</Text>
            }  
        <TextInput
          style={[styles.input, {width:"98%"}]} 
          placeholder={'Bairro'}
          placeholderTextColor={"black"}
          value={endereco[0]}
          onChangeText={handleChange('bairro')} 
          onBlur={() => setFieldTouched('bairro')}
        />  

             <View style={styles.politica}>
               <Text style={styles.texto}>Ao clicar em solicitar cadastro, concorda com os <Text><Politica/></Text></Text>
             </View>
             <View style={{marginBottom: 20}}>
 

        <Pressable  disable={true}
        onPress={handleSubmit}
        style={styles.botao}>
           <Text style={styles.textoBotao}>solicitar cadastro</Text>   
        </Pressable>  
     
               <Pressable onPress={() => navigation.navigate('Perfil')} >
                 <Botao 
                 cor={"#9A9A99"}
                 texto={"sair"}
                 />
               </Pressable> 

             </View>
           </View> 
         </ScrollView>
     </View>
        )}
      </Formik>
       </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  
  },

  texto:{
    fontWeight:'bold',
    fontSize: 11,  
    textTransform:'uppercase',
  },

  politica:{
    marginHorizontal:"15%", 
    textAlign:'center',
    marginVertical: 30
  },

  input:{
    backgroundColor:'#F9F8F8',
    marginVertical:'1%',
    marginHorizontal:'1%',
    borderRadius: 5,
    paddingLeft: "2%",
    paddingVertical: 6
 
 },

 imagem:{
  padding: 30,
  width: 90, 
  height: 90, 
  backgroundColor:'#D9D9D9',
  borderRadius: 50
},

mensagemErro:{
  fontSize: 12, 
  color: '#FF0D10', 
  alignSelf:'flex-start',
  marginLeft: "2%"
},

textoBotao:{
  textAlign:'center',
  fontSize: 11,
  textTransform:'uppercase',
  color:"white"
},

botao:{
  paddingVertical:15,
  alignItems:'center',
  justifyContent:'center',
  borderRadius: 10,
  marginVertical: 8,
  marginHorizontal: "3.5%",
  backgroundColor: "#F24141"
},

});
