import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { Button, Text, withTheme } from 'react-native-paper';

import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

const Login = ({ navigation, theme }) => {
  const styles = useStyles();
  const _navigate = (routeName) => {
    navigation.navigate(routeName);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('../../assets/images/logo_horizontal.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.textBold}>Let's Get Started</Text>

        <Button
          onPress={() => _navigate('Login')}
          mode="outlined"
          style={styles.button}>
          Sign in
        </Button>
        <Button
          onPress={() => _navigate('Register')}
          mode="contained"
          style={styles.button}>
          Sign up
        </Button>
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topSection: {
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  logo: {
    width: 160,
    height: 76.03,
    resizeMode: 'contain',
  },
  textBold: {
    fontSize: 55,
    fontFamily: 'Inter-Black',
    textAlign: 'center',
    letterSpacing: 2,
  },
  button: {
    marginVertical: 15,
  },
}));

export default withTheme(Login);
