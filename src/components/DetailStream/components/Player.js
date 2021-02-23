import React from 'react';
import { StatusBar, View, BackHandler } from 'react-native';

import { NodePlayerView } from 'react-native-nodemediaclient';

import { IconButton } from 'react-native-paper';
import Orientation from 'react-native-orientation-locker';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useScreenSize } from '../../../hooks/useScreenSize';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const PORTRAIT = 'PORTRAIT';

const Player = ({ url }) => {
  const styles = useStyles();
  let player = React.useRef(null);
  const { width, height, orientation } = useScreenSize();
  const [focus, setFocus] = React.useState(false);
  console.log({ orientation });
  const isPortraitScreen = orientation.includes(PORTRAIT);

  React.useEffect(() => {
    console.log('event');
    const backAction = () => {
      if (!isPortraitScreen) {
        Orientation.lockToPortrait();
        return true;
      }
      return false;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      Orientation.unlockAllOrientations();
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [focus, isPortraitScreen]);

  const _toggleScreenOrientation = () => {
    if (isPortraitScreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  // console.log({ width, height, orientation });

  // const isLocked = Orientation.isLocked();

  const portraitSize = width / 1.8;
  const landscapeSize = height;

  const playerSize = isPortraitScreen ? portraitSize : landscapeSize;

  // console.log({ aspetRatio });
  return (
    <TouchableWithoutFeedback onPress={() => setFocus(!focus)}>
      <View style={styles.container}>
        <StatusBar hidden />
        <NodePlayerView
          style={[
            styles.player,
            {
              height: playerSize,
            },
          ]}
          ref={(ref) => (player = ref)}
          inputUrl={url}
          scaleMode={'ScaleAspectFill'}
          bufferTime={300}
          maxBufferTime={1000}
          autoplay={true}
          onStatus={(code, msg) => {
            // console.log('onStatus=' + code + ' msg=' + msg);
          }}
        />
        {focus && (
          <View style={styles.actionWrapper}>
            <IconButton
              icon={() => (
                <Ionicons
                  name={isPortraitScreen ? 'expand-outline' : 'crop-outline'}
                  size={28}
                  color="#fff"
                />
              )}
              size={28}
              color="#fff"
              onPress={_toggleScreenOrientation}
              style={styles.fullScreenButton}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Player;

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: 'auto',
    backgroundColor: theme.colors.backdrop,
  },
  player: {
    width: '100%',
    backgroundColor: '#333',
  },
  actionWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.backdrop,
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  fullScreenButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
}));
