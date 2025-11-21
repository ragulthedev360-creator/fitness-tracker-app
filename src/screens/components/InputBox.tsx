import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function InputBox({ value, fieldname, onChangeText, placeholder, secure }:any) {
  return (
    <TextInput
      value={value}
      onChangeText={(text) => onChangeText(fieldname, text)}
      placeholder={placeholder}
      placeholderTextColor="#888"
      secureTextEntry={secure}
      style={styles.input}
    />
  );
}


const styles = StyleSheet.create({
 input: {
    borderWidth: 1,
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    borderColor: '#2f2f2f',
    backgroundColor: 'rgba(255, 255, 255, 0.26)',
    color: '#fff',
  },
});
