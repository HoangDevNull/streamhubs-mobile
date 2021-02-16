import React from 'react';
import {View, StyleSheet} from 'react-native';

const Center = ({children}) => {
  return <View style={styles.root}>{children}</View>;
};

export default Center;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
