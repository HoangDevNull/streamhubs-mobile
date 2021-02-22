import React from 'react';
import { View } from 'react-native';
import { Text, Badge } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

const LeftItem = ({ position = 'top', backdrop }) => {
  const styles = useStyles();
  return (
    <View
      style={[
        styles.container,
        backdrop && styles.backdrop,
        position.includes('top') ? styles.top : styles.bottom,
      ]}>
      <Badge size={8.5} style={styles.dot} />
      <Text style={styles.texBackdrop}> Live </Text>
    </View>
  );
};

export default React.memo(LeftItem);

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    alignSelf: 'flex-start',
    flexDirection: 'row',

    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  backdrop: {
    backgroundColor: theme.colors.backdrop,
  },
  bottom: {
    bottom: 6,
    left: 6,
  },
  top: {
    top: 6,
    left: 6,
  },
  dot: {
    alignSelf: 'center',
    marginRight: 3,
  },
  texBackdrop: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
}));
