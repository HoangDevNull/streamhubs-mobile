import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, withTheme, Surface } from 'react-native-paper';
import Header from '../common/Header';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/user';

const Gaming = ({ navigation, theme }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}>
        <Surface>
          <Headline>Gaming</Headline>
        </Surface>
      </View>
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
