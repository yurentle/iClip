import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, TextInput, Text, StyleSheet, Platform } from 'react-native';
import Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClipboardItem from '../../components/ClipboardItem';
import SearchBar from '../../components/SearchBar';
import Toast from 'react-native-toast-message';
import * as Permissions from 'expo-permissions';

const STORAGE_KEY = 'clipboardHistory';

export default function ClipboardHistoryScreen() {
  const [clipboardData, setClipboardData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [copiedText, setCopiedText] = useState('');

  const requestClipboardPermission = async () => {
    if (Platform.OS === 'android') {
      const { status } = await Permissions.askAsync(Permissions.CLIPBOARD);
      if (status !== 'granted') {
        console.log('Clipboard permission denied');
      }
    }
  };

  useEffect(() => {
    requestClipboardPermission();
    fetchClipboardData();
    const interval = setInterval(checkClipboard, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchClipboardData = async () => {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    if (storedData) {
      setClipboardData(JSON.parse(storedData));
    }
  };

  const checkClipboard = async () => {
    const content = await Clipboard.getStringAsync();
    if (content) {
      const newEntry = { id: Date.now().toString(), content, favorite: false };
      setClipboardData((prevData) => {
        const updatedData = [newEntry, ...prevData];
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        return updatedData;
      });
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('hello world').then(() => {
      Toast.show({
        type: 'success',
        text1: '222',
      });
    });
    Toast.show({
      type: 'success',
      text1: '333',
    });
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDelete = (id) => {
    const updatedData = clipboardData.filter(item => item.id !== id);
    setClipboardData(updatedData);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  };

  const handleFavorite = (id) => {
    const updatedData = clipboardData.map(item =>
      item.id === id ? { ...item, favorite: !item.favorite } : item
    );
    setClipboardData(updatedData);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  };

  const filteredData = clipboardData.filter(item =>
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = () => {
    Clipboard.setString(inputText);
    setInputText('');
    setTimeout(() => checkClipboard(), 500);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <SearchBar onSearch={handleSearch} />
      <TextInput
        style={{ height: 100, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        multiline
        placeholder="Type here to copy..."
        value={inputText}
        onChangeText={setInputText}
        onBlur={handleCopy}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClipboardItem
            item={item}
            onDelete={handleDelete}
            onFavorite={handleFavorite}
          />
        )}
      />
      <Button title="Click here to copy to Clipboard" onPress={copyToClipboard} />
      <Button title="View copied text" onPress={fetchCopiedText} />
      <Text style={styles.copiedText}>{copiedText}</Text>
      <Button title="Clear All" onPress={() => setClipboardData([])} />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copiedText: {
    marginTop: 10,
    color: 'red',
  },
});