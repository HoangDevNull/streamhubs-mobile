import React from 'react';
import { View, StyleSheet } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';

import Orientation from 'react-native-orientation-locker';

import ViewerCount from './shared/ViewerCount';

const PlayerAction = ({ isPortrait = true, open }) => {
  const styles = useStyles();

  const _toggleScreenOrientation = () => {
    if (isPortrait) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  return (
    <View style={[styles.container, open ? styles.show : styles.hide]}>
      <IconButton
        icon={() => (
          <Ionicons name="chevron-down-circle-outline" size={28} color="#fff" />
        )}
        size={33}
        color="#fff"
        onPress={() => console.log('pressed')}
        style={styles.topLeft}
      />

      <IconButton
        icon={() => <Ionicons name="settings-outline" size={22} color="#fff" />}
        size={33}
        color="#fff"
        onPress={_toggleScreenOrientation}
        style={styles.topRight}
      />

      <IconButton
        icon={() => (
          <Ionicons
            name={isPortrait ? 'expand-outline' : 'crop-outline'}
            size={22}
            color="#fff"
          />
        )}
        size={33}
        color="#fff"
        onPress={_toggleScreenOrientation}
        style={isPortrait ? styles.bottomRight : styles.bottomRightLandscape}
      />

      <ViewerCount
        style={isPortrait ? styles.bottomLeft : styles.bottomLeftLandscape}
        viewer="17 k"
      />
    </View>
  );
};

export default React.memo(PlayerAction);

const useStyles = makeStyles((theme) => ({
  container: {
    ...StyleSheet.absoluteFill,
    marginBottom: -1,
    marginTop: -1,
    backgroundColor: theme.colors.backdrop,
    zIndex: 2,
  },
  topLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRight: {
    position: 'absolute',
    top: 0,
    right: -5,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 0,
    right: -5,
  },
  bottomRightLandscape: {
    position: 'absolute',
    bottom: 120,
    right: 10,
  },
  bottomLeft: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    left: -5,
  },
  bottomLeftLandscape: {
    position: 'absolute',
    bottom: 135,
    left: 0,
    flexDirection: 'row',
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
}));
