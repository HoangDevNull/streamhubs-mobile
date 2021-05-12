import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import { NodeCameraView } from 'react-native-nodemediaclient';
import { IconButton, Colors, ToggleButton, Surface } from 'react-native-paper';

import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ROOT_IP } from '../../config';

import Orientation from 'react-native-orientation-locker';
import Chatlist from './ChatList';

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

const { width } = Dimensions.get('window');
class LiveStream extends React.Component {
  constructor(props) {
    super(props);
    const { route } = props;
    this.state = {
      flashEnable: true,
      isLive: false,
      channel: route.params,
      toggleAction: 'camera',
    };
    this.cameraView = null;
  }

  async componentDidMount() {
    await requestCameraPermission();
    Orientation.lockToLandscape();

    // Join room chat
    const { route, socket } = this.props;
    const channel = route.params;
    socket.emit('joinLiveChannel', {
      endPoint: channel?.endPoint,
      channelID: channel?.id,
    });
  }

  reverseCamera = () => {
    this.cameraView.switchCamera();
  };

  toggleFlashLigth = () => {
    const { flashEnable } = this.state;
    this.cameraView.flashEnable(flashEnable);
    this.setState({ flashEnable: !flashEnable });
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

  toggleAction = (state) => {
    let status = state;
    const prevState = this.state.toggleAction;
    if (!status) {
      status = prevState.includes('camera') ? 'chat' : 'camera';
    } else {
      status = state.includes('camera') ? 'chat' : 'camera';
    }
    this.setState({
      toggleAction: status,
    });
  };

  componentWillUnmount() {
    this.cameraView.stop();
    Orientation.lockToPortrait();
    const { socket, route } = this.props;
    socket.emit('leaveLiveChannel', route?.params?.endPoint);
  }
  render() {
    const { flashEnable, isLive, toggleAction } = this.state;
    const channel = this.props.route.params;

    const isChatAction = toggleAction.includes('chat');
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <NodeCameraView
          style={styles.container}
          ref={(ref) => {
            this.cameraView = ref;
          }}
          outputUrl={`rtmp://${ROOT_IP}/live/${channel?.endPoint}`}
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
          // onStatus={(code, msg) => {
          //   console.log('onStatus=' + code + ' msg=' + msg);
          // }}
        />

        <Surface style={styles.toggleView}>
          <ToggleButton.Row
            onValueChange={this.toggleAction}
            value={toggleAction}>
            <ToggleButton
              icon={() => (
                <Ionicons
                  name="videocam-outline"
                  size={25}
                  color={isChatAction ? '#333' : '#fff'}
                />
              )}
              value="camera"
            />
            <ToggleButton
              icon={() => (
                <Ionicons
                  name="chatbubbles-outline"
                  size={25}
                  color={!isChatAction ? '#333' : '#fff'}
                />
              )}
              value="chat"
            />
          </ToggleButton.Row>
        </Surface>

        {toggleAction.includes('camera') ? (
          <View style={styles.wrap_action}>
            <IconButton
              icon={() => (
                <Ionicons
                  name={!flashEnable ? 'flash-off-outline' : 'flash-outline'}
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
        ) : (
          <View style={styles.wrap_chatlist}>
            <Chatlist />
          </View>
        )}
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
  toggleView: {
    position: 'absolute',
    left: 20,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    marginTop: 10,
  },
  wrap_chatlist: {
    backgroundColor: 'rgba(0,0,0, 0.5)',
    position: 'absolute',
    right: 0,
    width: width / 3,
    height: '100%',
  },
});

function mapStateToProps(state) {
  return {
    socket: state.socket?.socketInstance,
  };
}

export default connect(mapStateToProps)(LiveStream);
