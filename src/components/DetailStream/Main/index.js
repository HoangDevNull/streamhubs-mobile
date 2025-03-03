/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StatusBar,
  View,
  BackHandler,
  TouchableWithoutFeedback,
  StyleSheet,
  AppState,
} from 'react-native';

import { debounce } from 'lodash';
import { connect } from 'react-redux';

import Orientation from 'react-native-orientation-locker';
import { NodePlayerView } from 'react-native-nodemediaclient';

import { ROOT_IP } from '../../../config';

import withResize from '../../../hoc/withScreenResize';

import PlayerAction from '../components/PlayerAction';
import CollapseInfo from '../components/CollapseInfo';
import ChatList from '../components/ChatList';
import ChatInput from '../components/ChatInput';
import { setFocus } from '../../../redux/actions/player';

export const calcPlayerHeight = ({ width, height, isPortrait }) => {
  const portraitSize = width / 1.8;
  const landscapeSize = height;
  const playerHeight = isPortrait ? portraitSize : landscapeSize;
  return playerHeight;
};

class Main extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
    };

    this.player = React.createRef(null);
  }

  _handleAppStateChange = (appState) => {
    if (appState.match(/inactive|background/)) {
      this.player.pause();
    } else {
      this.player.start();
    }
  };

  deviceBackEvent = () => {
    const { screenSize } = this.props;
    if (!screenSize.isPortrait) {
      Orientation.lockToPortrait();
      return true;
    }
    return false;
  };

  componentDidMount() {
    this._isMounted = true;
    BackHandler.addEventListener('hardwareBackPress', this.deviceBackEvent);
    AppState.addEventListener('change', this._handleAppStateChange);
    this.player.start();
    this.resetFocus();
  }

  resetFocus = debounce(() => {
    const { player: focus, dispatch } = this.props;
    this._isMounted && focus && dispatch(setFocus(false));
  }, 5000);

  toggleFocus = () => {
    const { player, dispatch } = this.props;
    dispatch(setFocus(!player.focus));
    this.resetFocus();
  };

  componentDidUpdate(prevProps) {
    const { resolution } = this.props.player;
    const { detailStream } = this.props;
    // Restart stream after change resolution
    const changeRes = resolution !== prevProps.player.resolution;
    const changeEndPoint =
      detailStream?.endPoint !== prevProps.detailStream?.endPoint;
    if (changeRes || changeEndPoint) {
      this.player.stop();
      this.player.start();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackHandler.removeEventListener('hardwareBackPress', this.deviceBackEvent);
    Orientation.removeAllListeners();
    this.player.stop();
  }

  render() {
    const { focus, showChatRoom, resolution } = this.props.player;

    // Props from parent
    const { screenSize, detailStream } = this.props;
    const { isPortrait, height } = screenSize;

    // Player
    const playerHeight = calcPlayerHeight(screenSize);
    const playerWidth = !isPortrait && showChatRoom ? '75%' : '100%';

    // Chat
    const headHeight = playerHeight + 125;
    const chatListOffset = focus ? headHeight : playerHeight;
    let chatListHeight = focus
      ? height - (headHeight + 100)
      : height - (playerHeight + 100);

    // Stream
    let url = `rtmp://${ROOT_IP}/live/${detailStream?.endPoint}`;

    if (resolution === 'auto') {
      // temporary solution. Need to enhance in future
      url = `rtmp://${ROOT_IP}/live/${detailStream?.endPoint}`;
    } else {
      url += `_${resolution}`;
    }
    return (
      <>
        <TouchableWithoutFeedback onPress={this.toggleFocus}>
          <View style={styles.container}>
            <StatusBar hidden={!isPortrait} />
            <NodePlayerView
              style={[
                styles.player,
                {
                  width: playerWidth,
                  height: playerHeight,
                },
              ]}
              ref={(ref) => (this.player = ref)}
              inputUrl={url}
              scaleMode={isPortrait ? 'ScaleAspectFill' : 'ScaleAspectFit'}
              bufferTime={300}
              maxBufferTime={1000}
              autoplay={true}
              onStatus={this._onStatus}
              audioEnable={true}
            />

            <PlayerAction
              onToggleChatRoom={this._handleToggleChatRoom}
              isPortrait={isPortrait}
            />

            <View
              onStartShouldSetResponder={() => true}
              style={[
                styles.chatList,
                {
                  top: isPortrait ? chatListOffset : 0,
                  height: isPortrait ? chatListHeight : playerHeight,
                  width: isPortrait ? '100%' : showChatRoom ? '25%' : '0%',
                  zIndex: isPortrait ? 0 : 10,
                  // paddingHorizontal: isPortrait ? 8 : showChatRoom ? 8 : 0,
                },
              ]}>
              {/* Chat main */}
              <ChatList />

              {!isPortrait && <ChatInput />}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <CollapseInfo isPortrait={isPortrait} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
  detailStream: state.detailStream,
});

export default React.memo(connect(mapStateToProps)(withResize(Main)));

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
  },
  player: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontBold: {
    fontFamily: 'Inter-Bold',
  },
  chatList: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
