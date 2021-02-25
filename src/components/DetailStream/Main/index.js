/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StatusBar,
  View,
  BackHandler,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import { debounce } from 'lodash';

import Orientation from 'react-native-orientation-locker';
import { NodePlayerView } from 'react-native-nodemediaclient';

import withResize from '../../../hoc/withScreenResize';

import PlayerAction from '../components/PlayerAction';
import CollapseInfo from '../components/CollapseInfo';
import ChatList from '../components/ChatList';

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
      focus: true,
      playing: false,
    };

    this.player = React.createRef(null);
  }

  componentDidMount() {
    this._isMounted = true;
    BackHandler.addEventListener('hardwareBackPress', this.deviceBackEvent);
    this.player.start();
    this.resestFocus();
  }

  deviceBackEvent = () => {
    const { screenSize: isPortrait } = this.props;
    if (!isPortrait) {
      Orientation.lockToPortrait();
      return true;
    }
    return false;
  };

  resestFocus = debounce(() => {
    const { focus } = this.state;
    this._isMounted && focus && this.setState({ focus: false });
  }, 5000);

  componentWillUnmount() {
    this._isMounted = false;
    BackHandler.removeEventListener('hardwareBackPress', this.deviceBackEvent);
    Orientation.removeAllListeners();
    console.log('stop player');
    this.player.stop();
  }

  render() {
    const { focus } = this.state;
    // Props from parent
    const { screenSize, url } = this.props;
    const { isPortrait, height } = screenSize;
    const playerHeight = calcPlayerHeight(screenSize);

    const headHeight = playerHeight + 125;
    const chatListOffset = focus ? headHeight : playerHeight;
    let chatListHeight = focus
      ? height - (headHeight + 100)
      : height - (playerHeight + 100);

    return (
      <>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({ focus: !focus });
            this.resestFocus();
          }}>
          <View style={styles.container}>
            <StatusBar hidden={!isPortrait} />
            <NodePlayerView
              style={[
                styles.player,
                {
                  height: playerHeight,
                },
              ]}
              ref={(ref) => (this.player = ref)}
              inputUrl={url}
              scaleMode={isPortrait ? 'ScaleAspectFill' : 'ScaleAspectFit'}
              bufferTime={300}
              maxBufferTime={1000}
              autoplay={false}
              // onStatus={this_onStatus}
            />

            <PlayerAction open={focus} isPortrait={isPortrait} />

            <View
              style={[
                styles.chatList,
                {
                  top: chatListOffset,
                  height: isPortrait ? chatListHeight : 100,
                },
              ]}>
              {/* Chat main */}
              <ChatList />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <CollapseInfo open={focus} isPortrait={isPortrait} />
      </>
    );
  }
}

export default withResize(React.memo(Main));

const styles = StyleSheet.create({
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
  chatList: {
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 10,
  },
});
