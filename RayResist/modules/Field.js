import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Field = ({ placeholder, onChangeText, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '78%',
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Field;
