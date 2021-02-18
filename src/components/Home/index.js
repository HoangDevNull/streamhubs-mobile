import React from 'react';
import { Button, withTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/user';

const Home = ({ navigation, theme }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Button mode="contained" onPress={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default withTheme(Home);
