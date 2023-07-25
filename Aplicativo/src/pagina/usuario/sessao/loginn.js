
import React, { useEffect, useState } from 'react';
import * as yup from 'yup'
import { Formik } from 'formik'
import { StyleSheet, View, ScrollView, Text, TextInput, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import _StatusBar from '../../../componente/statusBar/statusBar';
import Api from '../../../service/api';


export default function Cadastro() {
    function Cadastrar () { 
    if(selectedItems.length == 0) return;
    let data = {
    request: "createCommercial",
    nome: nomeComercial, 
    facebook: Facebook,
    cep: cep,
    categoria: selectedItems,
    local: local,
    foto: image}      
    Api .put('/controll/commercial.php', data)
    .then(function(res){
        console.log(res.data)})} 

    const navigation = useNavigation();

return (
    <View style={styles.container}>
    <Formik
        initialValues={{ 
            email: '' ,
            senha:'',
        }}
        onSubmit={values => Cadastrar(values.email,values.senha)}
        validationSchema={yup.object().shape({
            email: yup
            .string()
            .required("Informe o seu email."),
            senha: yup
            .string()
            .required("Informe a sua senha."),
        })} >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit}) => (

    <View style={styles.container}>
        <_StatusBar/>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.facaLogin}> 
            <Text style={{fontWeight:'bold'}}>
                Faça login, fique por
                dentro das suas tribos
                preferidas, </Text> receba
                notificações e muito mais,
                ou se torne um produtor e
                plublique seus eventos!
            </Text>  
            <View style={{marginHorizontal:'7%', marginBottom: 30}}> 
                <TextInput
                    style={[styles.input, {width:"98%"}]} 
                    placeholder={'E-mail'}
                    placeholderTextColor={"#9A9999"}
                    value={values.email}
                    keyboardType="email-address"
                    onChangeText={handleChange('email')} 
                    onBlur={() => setFieldTouched('email')}
                />
                {touched.email && errors.email &&
                <Text style={styles.mensagemErro}>{errors.email}</Text>
                } 
                <TextInput
                    style={[styles.input, {width:"98%"}]} 
                    placeholder={'Senha'}
                    placeholderTextColor={"#9A9999"}
                    value={values.senha}
                    onChangeText={handleChange('senha')} 
                    onBlur={() => setFieldTouched('senha')}
                />
                {touched.senha && errors.senha &&
                <Text style={styles.mensagemErro}>{errors.senha}</Text>
                }  
                <Pressable 
                    style={styles.botao}
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    <Text style={styles.textoBotao}>Fazer Login</Text>
                </Pressable>     
                <Text style={styles.botaoTexto}>Esqueceu sua senha?</Text>  
                <Text style={styles.convite}>Não faz parte de nenhuma tribo?</Text>  
                <Text onPress={() => navigation.navigate('Cadastro')} style={styles.botaoTexto}>Cadastre-se agora</Text>
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
    backgroundColor:'white' },

facaLogin:{
    fontSize: 20,
    textAlign:'center',
    color:"#000000",
    marginHorizontal:"13%",
    marginBottom: "8%" },

convite:{
    marginTop:"20%", 
    marginBottom:"5%", 
    textAlign:'center',
    fontWeight:'bold',
    marginVertical: 30},

input:{
    backgroundColor:'white',
    marginVertical:'1%',
    marginHorizontal:'1%',
    borderRadius: 10,
    borderWidth: 1.6,
    borderColor: '#D9D9D9',
    paddingLeft: "3%",
    paddingVertical: 10 },

botaoTexto: {
    fontWeight:'bold',
    fontSize: 11,  
    color: '#F24141',
    textAlign:'center'},

textoBotao:{
    textAlign:'center',
    fontSize: 11,
    fontWeight:'bold',
    textTransform:'uppercase',
    color:'white'},

botao:{
    paddingVertical:10,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 12,
    marginVertical: 20,
    marginHorizontal: "14.5%",   
    backgroundColor: "#F24141"
},

mensagemErro:{
    fontSize: 12, 
    color: '#FF0D10',
    alignSelf:'flex-start',
    marginLeft: "1.5%"
}

});
