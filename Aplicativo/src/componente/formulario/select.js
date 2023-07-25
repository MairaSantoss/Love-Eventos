import React from "react";
 import RNPickerSelect from "react-native-picker-select";
 import { StyleSheet, Text, View } from "react-native";
 

 const Select = () => {
    const placeholder = {
      label: 'Select a sport...',
      value: null,
      color: 'red',
    };

     return (
         <View style={styles.container}>
             <RNPickerSelect
                 onValueChange={(value) => console.log(value)}
                 items={[           
                     { label: "Todos", value: "1"},
                     { label: "Em andamento", value: "2" },
                     { label: "Cancelado", value: "3" },
                     { label: "Concluído", value: "4" },
                 ]}
                 placeholder={{}}      
             />
         </View>
     );
 }
 const styles = StyleSheet.create({
     container : {
       backgroundColor : "#EEEEEE",
       borderRadius:8,
       height: 50,
     },
 });
 export default Select;