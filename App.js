import React from 'react';
import { StyleSheet, View } from 'react-native';

import SplashScreen from 'react-native-splash-screen';

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
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <CustomPaperTheme>
        <Routes />
      </CustomPaperTheme>
    </Provider>
  );
};
