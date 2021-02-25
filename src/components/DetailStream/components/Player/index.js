import React from 'react';
import {
  StatusBar,
  View,
  BackHandler,
  TouchableWithoutFeedback,
} from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { debounce } from 'lodash';

import Orientation from 'react-native-orientation-locker';
import { NodePlayerView } from 'react-native-nodemediaclient';

import { useScreenSize } from '../../../../hooks/useScreenSize';
import PlayerAction from './PlayerAction';
import StreamInfo from './StreamInfo';

const PORTRAIT = 'PORTRAIT';

const Player = ({ url }) => {
  const styles = useStyles();
  let player = React.useRef();
  const [focus, setFocus] = React.useState(true);
  const [playing, setPlaying] = React.useState(false);
  const { width, height, orientation } = useScreenSize();
  const isPortraitScreen = orientation.includes(PORTRAIT);

  const resestFocus = React.useCallback(
    debounce(() => focus && setFocus(false), 5000),
    [],
  );

  // Unmounted componnent event
  React.useEffect(() => {
    resestFocus();
    return () => {
      console.log('un mount');
      Orientation.removeAllListeners();
      console.log({ player });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listener to back button when on Fullscreen mode
  React.useEffect(() => {
    const backAction = () => {
      if (!isPortraitScreen) {
        Orientation.lockToPortrait();
        return true;
      }
      return false;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [isPortraitScreen]);

  const onPressPlayButton = () => {
    console.log({ player });
    if (playing) {
      player.pause();
    } else {
      player.start();
    }

    setPlaying(!playing);
  };

  const _onStatus = (code, msg) => {
    // console.log('onStatus=' + code + ' msg=' + msg);
  };

  const portraitSize = width / 1.8;
  const landscapeSize = height;
  const playerSize = isPortraitScreen ? portraitSize : landscapeSize;
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setFocus(!focus);
          resestFocus();
        }}>
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
            scaleMode={isPortraitScreen ? 'ScaleAspectFill' : 'ScaleAspectFit'}
            bufferTime={300}
            maxBufferTime={1000}
            autoplay={false}
            onStatus={_onStatus}
          />

          <PlayerAction
            onPressPlayButton={onPressPlayButton}
            open={focus}
            isPortraitScreen={isPortraitScreen}
          />
        </View>
      </TouchableWithoutFeedback>

      <StreamInfo open={focus} isPortraitScreen={isPortraitScreen} />
    </>
  );
};

export default Player;

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: 'auto',
  },
  player: {
    width: '100%',
  },
  fontBold: {
    fontFamily: 'Inter-Bold',
  },
}));
