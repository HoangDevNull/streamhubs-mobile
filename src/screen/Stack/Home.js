import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Headline} from 'react-native-paper';

const {width} = Dimensions.get('window');
const Home = ({navigation}) => {
  return (
    <View style={styles.root}>
      <Headline>Home screen</Headline>
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
