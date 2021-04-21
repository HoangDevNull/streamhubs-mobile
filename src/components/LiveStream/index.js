import React from 'react';
import { View, StatusBar, StyleSheet, PermissionsAndroid } from 'react-native';
import { NodeCameraView } from 'react-native-nodemediaclient';
import { IconButton, Colors } from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { ROOT_IP } from '../../config';

import Orientation from 'react-native-orientation-locker';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ],
      {
        title: 'Cool Photo App Camera And Microphone Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

class LiveStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flashEnable: false, isLive: false };
    this.cameraView = null;
  }

  async componentDidMount() {
    await requestCameraPermission();
    Orientation.lockToLandscape();
  }

  reverseCamera = () => {
    this.cameraView.switchCamera();
  };

  toggleFlashLigth = () => {
    const { flashEnable } = this.state;
    this.setState({ flashEnable: !flashEnable });
    this.cameraView.flashEnable(this.state.flashEnable);
  };

  toggleLiveStream = async () => {
    const { isLive } = this.state;
    if (isLive) {
      this.cameraView.stop();
    } else {
      this.cameraView.start();
    }
    this.setState({ isLive: !isLive });
  };

  componentWillUnmount() {
    this.cameraView.stop();
    Orientation.lockToPortrait();
  }
  render() {
    const { flashEnable, isLive } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <NodeCameraView
          style={{ flex: 1 }}
          ref={(ref) => {
            this.cameraView = ref;
          }}
          outputUrl={`rtmp://${ROOT_IP}/live/test`}
          camera={{ cameraId: 0, cameraFrontMirror: true }}
          audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
          video={{
            preset: 5,
            bitrate: 400000,
            profile: 0,
            fps: 15,
            videoFrontMirror: false,
          }}
          smoothSkinLevel={3}
          autopreview={true}
          onStatus={(code, msg) => {
            console.log('onStatus=' + code + ' msg=' + msg);
          }}
        />

        <View style={styles.wrap_action}>
          <IconButton
            icon={() => (
              <Ionicons
                name={flashEnable ? 'flash-off-outline' : 'flash-outline'}
                size={25}
                color="#fff"
              />
            )}
            size={35}
            onPress={this.toggleFlashLigth}
            style={styles.action_button}
          />
          <IconButton
            icon={() => (
              <Ionicons
                name={isLive ? 'stop' : 'pulse-outline'}
                size={22}
                color={isLive ? Colors.redA700 : '#fff'}
              />
            )}
            size={42}
            onPress={this.toggleLiveStream}
            style={[
              styles.live_button,
              { backgroundColor: isLive ? '#fff' : Colors.redA700 },
            ]}
          />
          <IconButton
            icon={() => <Ionicons name="sync" size={25} color="#fff" />}
            size={35}
            onPress={this.reverseCamera}
            style={styles.action_button}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  wrap_action: {
    height: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    // flexDirection: 'row',
  },
  live_button: {
    borderColor: '#fff',
    borderWidth: 3,
    backgroundColor: Colors.redA700,
  },
  action_button: {
    backgroundColor: 'rgba(211,211,211, 0.5)',
  },
});

export default LiveStream;
