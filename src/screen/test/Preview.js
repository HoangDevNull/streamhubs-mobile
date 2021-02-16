import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import {NodePlayerView} from 'react-native-nodemediaclient';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const PreviewScreen = ({navigation}) => {
  const [streamName, setStreamName] = React.useState('stream');
  let player = React.useRef(null);

  const startPreview = () => {
    console.log({streamName, player});
    player.start();
  };

  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
      <View style={styles.root}>
        <NodePlayerView
          style={{width, height: 300, backgroundColor: '#333'}}
          inputUrl={'rtmp://192.168.1.8/live/stream'}
          scaleMode={'ScaleAspectFill'}
          bufferTime={300}
          maxBufferTime={1000}
          autoplay={true}
          onStatus={(code, msg) => {
            console.log('onStatus=' + code + ' msg=' + msg);
          }}
        />
        <View style={styles.wrap_input}>
          <TextInput
            style={styles.input}
            onChangeText={(name) => setStreamName(name)}
            placeholder="input the name of stream"
          />
          <Button
            title="Go now"
            disabled={streamName === ''}
            onPress={startPreview}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap_input: {
    flex: 1,
  },
  input: {
    marginVertical: 16,
    paddingVertical: 15,
    paddingHorizontal: 35,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
