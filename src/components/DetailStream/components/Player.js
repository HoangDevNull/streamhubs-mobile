import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import { NodePlayerView } from 'react-native-nodemediaclient';
import { useScreenSize } from '../../../hooks/useScreenSize';
import { IconButton } from 'react-native-paper';
import Orientation from 'react-native-orientation-locker';

const getHeight = (windowWidth, aspetRatio) => {
  return windowWidth * aspetRatio;
};
const Player = ({ url }) => {
  let player = React.useRef(null);

  const { width, height } = useScreenSize();

  return (
    <>
      <StatusBar hidden />
      <NodePlayerView
        style={{
          width: '100%',
          height: getHeight(width, 2 / 4),
          backgroundColor: '#333',
        }}
        inputUrl={url}
        scaleMode={'ScaleAspectFill'}
        bufferTime={300}
        maxBufferTime={1000}
        autoplay={true}
        onStatus={(code, msg) => {
          // console.log('onStatus=' + code + ' msg=' + msg);
        }}
      />
      <IconButton
        icon="plus"
        size={20}
        color="#fff"
        onPress={() => {
          Orientation.lockToLandscape();
        }}
      />
    </>
  );
};

export default Player;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
