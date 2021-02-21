import React from 'react';
import { StatusBar, View } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

//Navigator
import AuthStack from './AuthStack';
import AppStack from './AppStack';
// Redux + theme
import { saveLoginInfo } from '../redux/actions/user';
import { LightTheme, DarkTheme } from '../theme';

export default () => {
  const styles = useStyles();
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const { isLoggedIn, theme } = useSelector((state) => state.user);

  React.useEffect(() => {
    AsyncStorage.getItem('user')
      .then((info) => {
        if (info) {
          dispatch(saveLoginInfo(JSON.parse(info)));
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
  }, [dispatch]);

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
