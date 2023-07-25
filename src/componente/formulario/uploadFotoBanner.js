import React, { useState} from 'react';
import { Image, View, StyleSheet, Pressable, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Banner = () => {
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState("flex");
  const [altura, setAltura] = useState(10);
  const [largura, setLargura] = useState(10,);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,   
      aspect:[1,1],
      quality: 1,    
    });

    if (!result.cancelled) {
        setIcon("none")
        setAltura(90)
        setLargura(90)
       setImage(result.uri);

    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage} style={styles.card} >
       <Image source={{ uri: image }} style={[{width:largura, height:altura}, styles.imagem]}/>
       <MaterialCommunityIcons name="arrow-up-bold-circle" size={28} color="#DAD3D3"
        style={[styles.icon,{justifyContent:"center", display:`${icon}`}]} />
      </Pressable>
    
    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 15
  },

  imagem:{
  borderRadius: 7,
  marginLeft: -3
  },

  card:{
    borderWidth: 0.5,
    padding: 2,
    borderColor: '#D9D9D9',
    borderRadius: 7,
    justifyContent:'center',
    width: 88, 
    height: 88, 
  },

  icon:{
    alignSelf:'center'
  }
  
});

export default Banner;