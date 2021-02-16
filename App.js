import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import {Provider} from 'react-redux';

import store from './src/redux';
import Routes from './src/routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => {
  const isDarkModeOn = true;
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <PaperProvider theme={isDarkModeOn ? DarkTheme : DefaultTheme}>
          <Routes theme={isDarkModeOn ? 'dark' : 'light'} />
        </PaperProvider>
      </View>
    </Provider>
  );
};
