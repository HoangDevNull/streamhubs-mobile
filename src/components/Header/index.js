import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';
import Left from './components/Left';
import Right from './components/Right';

const Header = ({ theme, title }) => {
  return (
    <Appbar.Header
      style={[styles.root, { backgroundColor: theme.colors.background }]}>
      {/* Left pannel */}
      <Left title={title} />
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
