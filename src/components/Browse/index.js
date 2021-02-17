import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, withTheme, Surface, Text } from 'react-native-paper';
import Header from '../Header';
import { useDispatch } from 'react-redux';

const Browse = ({ navigation, theme }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Header title="Browse" />
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}>
        <Surface>
          <Headline>Browse</Headline>
        </Surface>
      </View>
    </>
  );
};

export default withTheme(Browse);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
