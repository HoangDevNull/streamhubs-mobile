import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import AppTabs from './AppTabs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
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
      <View>
        <Text> Loading ...</Text>
      </View>
    );
  }
  return (
    <NavigationContainer
      theme={theme.includes('dark') ? DarkTheme : LightTheme}>
      {isLoggedIn ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
