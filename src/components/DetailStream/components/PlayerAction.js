import React from 'react';
import { View, StyleSheet } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconButton, Text } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import Orientation from 'react-native-orientation-locker';

import ViewerCount from './shared/ViewerCount';
import { openSetting, toggleChatRoom } from '../../../redux/actions/player';

const PlayerAction = ({ isPortrait = true }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  // Controll state;
  const { focus, showChatRoom, openSetting: open } = useSelector(
    (state) => state.player,
  );

  const _toggleScreenOrientation = () => {
    if (isPortrait) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };
  const _openSetting = () => {
    dispatch(openSetting(!open));
  };

  const _toggleChatRoom = () => {
    dispatch(toggleChatRoom(!showChatRoom));
  };

  return (
    <>
      <View
        style={[
          styles.container,
          focus ? styles.show : styles.hide,
          !isPortrait && showChatRoom && styles.showChatRoom,
        ]}>
        <IconButton
          disabled={!focus}
          icon={() => (
            <Ionicons
              name="chevron-down-circle-outline"
              size={28}
              color="#fff"
            />
          )}
          size={30}
          color="#fff"
          onPress={() => console.log('pressed')}
          style={styles.topLeft}
        />

        <View style={styles.topRight}>
          {!isPortrait && (
            <IconButton
              disabled={!focus}
              icon={() => (
                <Ionicons
                  name={
                    showChatRoom
                      ? 'chatbubble-ellipses-outline'
                      : 'chatbubble-outline'
                  }
                  size={22}
                  color="#fff"
                />
              )}
              size={30}
              color="#fff"
              onPress={_toggleChatRoom}
            />
          )}
          <IconButton
            disabled={!focus}
            icon={() => (
              <Ionicons name="settings-outline" size={22} color="#fff" />
            )}
            size={30}
            color="#fff"
            onPress={_openSetting}
          />
        </View>

        <IconButton
          disabled={!focus}
          icon={() => (
            <Ionicons
              name={isPortrait ? 'expand-outline' : 'crop-outline'}
              size={22}
              color="#fff"
            />
          )}
          size={30}
          color="#fff"
          onPress={_toggleScreenOrientation}
          style={isPortrait ? styles.bottomRight : styles.bottomRightLandscape}
        />

        <ViewerCount
          style={isPortrait ? styles.bottomLeft : styles.bottomLeftLandscape}
          viewer="17 k"
        />
      </View>
    </>
  );
};

export default React.memo(PlayerAction);

const useStyles = makeStyles((theme) => ({
  containerTransparent: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'red',
    marginBottom: -1,
    marginTop: -1,
    zIndex: 3,
  },
  container: {
    ...StyleSheet.absoluteFill,
    marginBottom: -1,
    marginTop: -1,
    backgroundColor: theme.colors.backdrop,
    zIndex: 2,
  },
  showChatRoom: {
    width: '75%',
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
    flexDirection: 'row',
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
    bottom: 8,
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
