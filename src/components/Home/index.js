import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, withTheme } from 'react-native-paper';
import Header from '../Header';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/user';

const Home = ({ navigation, theme }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Header title="Following" />
      <Button mode="contained" onPress={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default withTheme(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
