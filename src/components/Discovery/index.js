import React from 'react';
import { StyleSheet } from 'react-native';
import { Headline, Surface, withTheme } from 'react-native-paper';

import { useDispatch } from 'react-redux';

const Discovery = ({ navigation, theme }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Surface>
        <Headline> Discovery</Headline>
      </Surface>
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
