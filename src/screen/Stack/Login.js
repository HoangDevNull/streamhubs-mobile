import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {saveLoginInfo} from '../../redux/actions/auth';
import {CommonActions} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default React.memo(({navigation}) => {
  const {auth} = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log({auth});
  const goToHomePage = React.useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Home'}],
      }),
    );
  }, [navigation]);

  React.useEffect(() => {
    (async () => {
      const info = await AsyncStorage.getItem('auth');
      console.log({info});
      if (info) {
        dispatch(saveLoginInfo(JSON.parse(info)));
        goToHomePage();
      }
    })();
  }, [navigation, dispatch, goToHomePage]);

  const handleLogin = () => {
    dispatch(
      saveLoginInfo({
        email: 'h@gmail.com',
        access_token: '12312312',
        isLoggedIn: true,
        userProfile: {},
      }),
    );
    goToHomePage();
  };

  return (
    <View style={styles.container}>
      <Text> Login screen</Text>
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
