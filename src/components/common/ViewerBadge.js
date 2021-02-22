import React from 'react';
import { View } from 'react-native';
import { Text, Badge } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ViewerBadge = ({ position = 'top', backdrop, count }) => {
  const styles = useStyles();
  return (
    <View
      style={[
        styles.container,
        backdrop && styles.backdrop,
        position.includes('top') ? styles.top : styles.bottom,
      ]}>
      <Ionicons name="people-outline" color="#fff" size={22} />
      <Text style={styles.texBackdrop}> {count} </Text>
    </View>
  );
};

export default React.memo(ViewerBadge);

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
  texBackdrop: {
    alignSelf: 'center',
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
}));
