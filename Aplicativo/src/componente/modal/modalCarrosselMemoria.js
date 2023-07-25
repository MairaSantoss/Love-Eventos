import React, { useState } from "react";
import {Modal, StyleSheet, Text, Pressable, View, Image, useWindowDimensions, ImageBackground} from "react-native";

import { Ionicons } from '@expo/vector-icons';



const Modaal = ({Imagem, OpenImagem}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const window = useWindowDimensions();
return (
  <View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >       
     <View style={styles.modalView}>

          <ImageBackground style={[styles.imagem,{width: window.width, height: window.height}]} source={OpenImagem}>  

          <View style={{ alignSelf:'flex-end'}}>
              <Pressable
                style={{padding:5}}
                onPress={() => setModalVisible(!modalVisible)}
                >
                <Ionicons style={{margin: 5}} name="close-circle" size={24} color="red" /> 
              </Pressable>
            </View> 

          </ImageBackground>

          
        </View>          
    </Modal>

    <Pressable onPress={() => setModalVisible(true)} >
      <Image style={[styles.imagem,{width: window.height * 0.177, height: window.height * 0.3}]} source={Imagem} />
    </Pressable>
 </View>
  );
};

const styles = StyleSheet.create({
  
 imagem:{
    borderRadius: 13,
 },

 modalView: {
    backgroundColor:'#D9D9D9'
 }


});

export default Modaal;