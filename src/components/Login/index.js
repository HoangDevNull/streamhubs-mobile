import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

import {useDispatch} from 'react-redux';
import {saveLoginInfo} from '../../redux/actions/auth';
import {CommonActions} from '@react-navigation/native';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  console.log({navigation});

  const handleLogin = () => {
    dispatch(
      saveLoginInfo({
        email: 'h@gmail.com',
        access_token: '12312312',
        isLoggedIn: true,
        userProfile: {},
      }),
    );
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Home'}],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text> Login screen</Text>
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
