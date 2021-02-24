import React from 'react';
import { View, BackHandler, StyleSheet } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Badge, Text, IconButton } from 'react-native-paper';

import Orientation from 'react-native-orientation-locker';

const PORTRAIT = 'PORTRAIT';

const PlayerAction = ({ orientation, open }) => {
  const styles = useStyles();
  const isPortraitScreen = orientation.includes(PORTRAIT);

  const _toggleScreenOrientation = () => {
    if (isPortraitScreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  return (
    <View style={[styles.container, { opacity: open ? 1 : 0 }]}>
      <View style={styles.bottomLeft}>
        <View style={styles.gridRow}>
          <Badge size={10} style={styles.dot} />
          <Text style={styles.fontBold}> LIVE </Text>
        </View>
        <View style={styles.gridRow}>
          <Ionicons name="people-outline" size={22} color="#fff" />
          <Text style={styles.fontBold}> 17k </Text>
        </View>
      </View>

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
            name={isPortraitScreen ? 'expand-outline' : 'crop-outline'}
            size={22}
            color="#fff"
          />
        )}
        size={33}
        color="#fff"
        onPress={_toggleScreenOrientation}
        style={styles.bottomRight}
      />

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
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  dot: {
    alignSelf: 'center',
    marginRight: 3,
  },
}));
