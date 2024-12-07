import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const ClipboardItem = ({ item, onDelete, onFavorite }) => {
  return (
    <View style={styles.container}>
      {item.type === 'text' ? (
        <Text>{item.content}</Text>
      ) : (
        <Image source={{ uri: item.content }} style={styles.image} />
      )}
      <Button title="Delete" onPress={() => onDelete(item.id)} />
      <Button title="Favorite" onPress={() => onFavorite(item.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ClipboardItem;
