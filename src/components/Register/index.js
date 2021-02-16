import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

import {useDispatch} from 'react-redux';

const Register = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text> Login screen</Text>
      <Button mode="contained">Register</Button>
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

export default Register;
