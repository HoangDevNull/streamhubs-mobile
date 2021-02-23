import React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';

import { NodePlayerView } from 'react-native-nodemediaclient';
import { useScreenSize } from '../../hooks/useScreenSize';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const getHeight = (windowWidth, aspetRatio) => {
  return windowWidth * aspetRatio;
};
const Player = ({ url }) => {
  const [streamName, setStreamName] = React.useState('stream');
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
