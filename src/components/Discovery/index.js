import React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';
import Header from '../Header';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/user';

const Discovery = ({ navigation, theme }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Header title="Discovery" />
    </>
  );
};

export default withTheme(Discovery);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
