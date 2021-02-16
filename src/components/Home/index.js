import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Button, Headline, useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/actions/auth';

const {width} = Dimensions.get('window');
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <View style={styles.root}>
      <Headline>Home screen</Headline>
      <Button mode="contained" onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
