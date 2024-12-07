import React from 'react';
import { View, Text, Switch, StyleSheet, Button, Image, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(false);

  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);
  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Settings</ThemedText>
      <View style={styles.settingItem}>
        <ThemedText>Dark Mode</ThemedText>
        <Switch onValueChange={toggleDarkMode} value={isDarkMode} />
      </View>
      <View style={styles.settingItem}>
        <ThemedText>Enable Notifications</ThemedText>
        <Switch onValueChange={toggleNotifications} value={isNotificationsEnabled} />
      </View>
      <Button title="Clear Clipboard History" onPress={() => {}} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});
