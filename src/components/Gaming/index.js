import React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';
import Header from '../Header';
import { useDispatch } from 'react-redux';

const Gaming = ({ navigation, theme }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Header title="Gaming" />
    </>
  );
};

export default withTheme(Gaming);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
