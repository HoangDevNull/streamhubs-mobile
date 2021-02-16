import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const StreamScreen = ({ navigation: router }) => {
  return (
    <View style={styles.root}>
      <Text>StreamScreen</Text>
      <Button onPress={() => router.goBack()} title="Go back" />
      <Button onPress={() => router.push('preview')} title="Go preview" />
    </View>
  );
};

export default StreamScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
