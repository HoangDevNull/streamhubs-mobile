import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './AuthStack';
import AppTabs from './AppTabs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {saveLoginInfo} from '../redux/actions/auth';
import {ActivityIndicator} from 'react-native';
import Center from '../components/common/Center';

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state) => state.auth);

  React.useEffect(() => {
    AsyncStorage.getItem('auth')
      .then((info) => {
        console.log({info});
        if (info) {
          dispatch(saveLoginInfo(JSON.parse(info)));
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log({err});
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
