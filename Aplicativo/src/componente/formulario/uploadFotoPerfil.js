import React, { useState} from 'react';
import { Image, View, StyleSheet, Pressable, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const Perfil = ({texto}) => {
  const [image, setImage] = useState(null);
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
      setImage(result.uri);
    }
  };

  return (
    <View >
      <Pressable onPress={pickImage}>
       <Image source={{ uri: image }} style={styles.imagem} />
      </Pressable>
      <Text style={styles.texto}>{texto}</Text>
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
     padding: 30,
     width: 90, 
     height: 90, 
     backgroundColor:'#D9D9D9',
     borderRadius: 50
  },

  texto:{
    fontSize: 11,
    textTransform:'uppercase',
    marginTop: 5
  }
  
});

export default Perfil;