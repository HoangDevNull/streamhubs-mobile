import React from 'react';
import { StatusBar, View, LogBox } from 'react-native';
import { ActivityIndicator, Colors, Snackbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { ROOT_URL } from '../config';

//Navigator
import AuthStack from './AuthStack';
import AppStack from './AppStack';
// Redux + theme
import { saveLoginInfo } from '../redux/actions/user';
import { LightTheme, DarkTheme } from '../theme';
import { setSnackbar } from '../redux/actions/snackbar';
import { initSocket } from '../redux/actions/socket';

LogBox.ignoreLogs([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

export default () => {
  const styles = useStyles();
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const { isLoggedIn, theme } = useSelector((state) => state.user);
  const { open, text } = useSelector((state) => state.snackbar);

  React.useEffect(() => {
    let socket = null;
    AsyncStorage.getItem('user')
      .then((info) => {
        if (info) {
          const parseInfo = JSON.parse(info);
          const socket = io.connect(ROOT_URL);
          socket.on('connect', () => {
            socket
              .emit('authenticate', { token: parseInfo.access_token }) //send the jwt
              .on('authenticated', () => {
                dispatch(
                  initSocket({
                    socketInstance: socket,
                    socketAuth: true,
                  }),
                );
              });
            // .on('unauthorized', (msg) => {});
          });
          dispatch(saveLoginInfo(parseInfo));
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log({ err });
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });

    return () => {
      socket && socket?.close();
    };
  }, [dispatch]);

  const _dismissSnackbar = () => {
    dispatch(setSnackbar({ open: false, text: '' }));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={isLoading}
          size="large"
          color={Colors.purple600}
        />
      </View>
    );
  }

  const isDarkModeOn = theme.includes('dark');
  const statusBarColor = isDarkModeOn
    ? DarkTheme.colors.background
    : LightTheme.colors.background;

  return (
    <NavigationContainer theme={isDarkModeOn ? DarkTheme : LightTheme}>
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle={isDarkModeOn ? 'light-content' : 'dark-content'}
      />
      {isLoggedIn ? <AppStack /> : <AuthStack />}

      <Snackbar visible={open} onDismiss={_dismissSnackbar}>
        {text}
      </Snackbar>
    </NavigationContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
}));
