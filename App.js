import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Provider } from 'react-redux';

import store from './src/redux';
import Routes from './src/routes';
import CustomPaperTheme from './src/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <CustomPaperTheme>
          <Routes />
        </CustomPaperTheme>
      </View>
    </Provider>
  );
};
