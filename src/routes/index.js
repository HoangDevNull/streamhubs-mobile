import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

//Navigator
import AppTabs from './AppTabs';
import AuthStack from './AuthStack';
// Redux + theme
import { saveLoginInfo } from '../redux/actions/user';
import { LightTheme, DarkTheme } from '../theme';

export default () => {
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
      {isLoggedIn ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
