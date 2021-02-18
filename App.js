import React from 'react';

import SplashScreen from 'react-native-splash-screen';

import { Provider } from 'react-redux';

import store from './src/redux';
import Routes from './src/routes';
import CustomPaperTheme from './src/theme';

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
