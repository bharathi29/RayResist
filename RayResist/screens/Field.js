import React from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';

const Field = ({placeholder, keyboardType}) => {
  return (
    <View style={styles.fieldContainer}>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
    width: '78%',
  },
  input: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 10, // Adjust padding here
    paddingHorizontal: 15, // Adjust padding here
    borderRadius: 5,
    width: '100%',
    fontSize: 16,
  },
});

export default Field;
