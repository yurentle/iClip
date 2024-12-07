import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Search..." 
        style={styles.input} 
        onChangeText={onSearch} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
});

export default SearchBar;
