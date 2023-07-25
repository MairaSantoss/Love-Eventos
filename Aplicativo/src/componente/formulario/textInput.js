import React, { useState } from "react";
import {TextInput, StyleSheet, Text, View} from "react-native";

//#F9F8F8


const textInput = ({placeholder, largura}) => {
  
  const[email, setEmail] = useState("");
return (
    <TextInput
     style={[styles.input, {width:largura}]} 
     placeholder={placeholder}
     placeholderTextColor={"black"}
    />

  );
};

const styles = StyleSheet.create({

input:{
   backgroundColor:'#F9F8F8',
   marginVertical:'1%',
   marginHorizontal:'1%',
   borderRadius: 5,
   paddingLeft: "2%",
   paddingVertical: 6
},


});

export default textInput;