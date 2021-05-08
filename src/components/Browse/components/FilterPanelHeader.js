import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { Text, withTheme } from 'react-native-paper';

const FilterPanelHeader = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Filter and sort</Text>
    </View>
  );
};

export default withTheme(FilterPanelHeader);

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: 'center',
    height: 46,
    width: '100%',
    backgroundColor: theme.colors.surface,
    padding: 10,
  },
  text: {
    color: theme.colors.text,
    fontFamily: 'Inter-Black',
    fontSize: 14,
    letterSpacing: 1.5,
  },
}));
