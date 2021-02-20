import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';
import Left from './components/Left';
import Right from './components/Right';
import Center from './components/Center';

const Header = ({ theme }) => {
  return (
    <Appbar.Header
      style={[styles.root, { backgroundColor: theme.colors.background }]}>
      {/* Left pannel */}
      <Left />
      <Center />
      {/* Right pannel */}
      <Right />
    </Appbar.Header>
  );
};

export default withTheme(Header);

const styles = StyleSheet.create({
  root: {
    elevation: 0,
  },
  title: {
    fontFamily: 'Inter-Black',
    letterSpacing: 1.4,
  },
  letterPurple: {
    color: '#8734FE',
  },
  letterPink: {
    color: '#FF4994',
  },
});
