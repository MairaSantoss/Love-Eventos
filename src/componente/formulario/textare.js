import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const UselessTextInput = props => {
    return (
      <TextInput
        {...props} 
        editable
        maxLength={30}      
      />
    );
  };
  
  const UselessTextInputMultiline = ({placeholder}) => {
    const [value, onChangeText] = React.useState('');
  
    return (
      <View
        style={styles.input}>
        <UselessTextInput
          multiline={true}
          numberOfLines={1}
          placeholder={placeholder}
          onChangeText={text => onChangeText(text)}
          value={value}
        
        />
      </View>
    );
  };

const styles = StyleSheet.create({
    input:{
        backgroundColor:'#F9F8F8',
        marginVertical:'1%',
        marginHorizontal:'1%',
        borderRadius: 5,
        paddingLeft: "2%",
        paddingVertical: 6,
        paddingBottom: 50
    },     


});
    
export default UselessTextInputMultiline;

