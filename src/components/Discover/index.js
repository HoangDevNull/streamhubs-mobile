import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Headline,
  withTheme,
  Text,
  Paragraph,
  Subheading,
  Caption,
  Surface,
} from 'react-native-paper';
import Header from '../common/Header';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/user';

const Discover = ({ navigation, theme }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Header />
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}>
        <Surface>
          <Headline> Discover</Headline>
        </Surface>
      </View>
    </>
  );
};

export default withTheme(Discover);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
