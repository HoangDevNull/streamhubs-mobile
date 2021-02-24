import React from 'react';
import { View, BackHandler, StyleSheet } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Badge, Text, IconButton } from 'react-native-paper';

import Orientation from 'react-native-orientation-locker';
import ScreenResize from './actions/ScreenResize';
import ViewerCount from './actions/ViewerCount';

const PlayerAction = ({ isPortraitScreen, open }) => {
  const styles = useStyles();

  const _toggleScreenOrientation = () => {
    if (isPortraitScreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  return (
    <View style={[styles.container, { opacity: open ? 1 : 0 }]}>
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

      {/* On fullscreen this will render in StreamInfo component */}
      {isPortraitScreen && (
        <ScreenResize>
          <ScreenResize
            style={styles.bottomRight}
            isPortraitScreen={isPortraitScreen}
          />

          <ViewerCount style={styles.bottomLeft} viewer="17 k" />
        </ScreenResize>
      )}

      {/* <View style={styles.center}>
        <IconButton
          icon={() => <Ionicons name="play-outline" size={30} color="#fff" />}
          size={33}
          color="#fff"
          onPress={_toggleScreenOrientation}
        />
      </View> */}
    </View>
  );
};

export default React.memo(PlayerAction);

const useStyles = makeStyles((theme) => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.backdrop,
    zIndex: 2,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  topLeft: {
    position: 'absolute',
    top: 15,
    left: 0,
  },
  topRight: {
    position: 'absolute',
    top: 15,
    right: 0,
  },
  bottomLeft: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    left: 0,
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
