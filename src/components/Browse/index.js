import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, withTheme, Surface, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';

const Browse = ({ navigation, theme }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Surface>
        <Headline> Discovery</Headline>
      </Surface>
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
