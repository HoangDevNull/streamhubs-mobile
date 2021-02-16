import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, withTheme } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import { saveLoginInfo } from '../../redux/actions/user';

const Login = ({ navigation, theme }) => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(
      saveLoginInfo({
        email: 'h@gmail.com',
        access_token: '12312312',
        isLoggedIn: true,
        userProfile: {},
      }),
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
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

export default withTheme(Login);
