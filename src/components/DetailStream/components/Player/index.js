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

import PlayerAction from './PlayerAction';
import StreamInfo from './StreamInfo';
import withScreenResize from '../../../../hoc/withScreenResize';

const PORTRAIT = 'PORTRAIT';

class Player extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      focus: false,
      playing: false,
    };

    this.player = React.createRef(null);
  }

  componentDidMount() {
    this._isMounted = true;
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
    this.player.start();
  }

  backAction = () => {
    const { screenSize } = this.props;
    const isPortraitScreen = screenSize.orientation.includes(PORTRAIT);
    if (!isPortraitScreen) {
      Orientation.lockToPortrait();
      return true;
    }
    return false;
  };

  // onPressPlayButton = () => {
  //   const { playing } = this.state;
  //   if (playing) {
  //     this.player.pause();
  //   } else {
  //     this.player.start();
  //   }

  //   this.setState({ playing: !playing });
  // };

  resestFocus = debounce(() => {
    const { focus } = this.state;
    this._isMounted && focus && this.setState({ focus: false });
  }, 5000);

  componentWillUnmount() {
    this._isMounted = false;
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
    Orientation.removeAllListeners();
    console.log('stop player');
    this.player.stop();
  }

  render() {
    const { focus } = this.state;
    const {
      screenSize: { orientation, width, height },
      url,
    } = this.props;
    const isPortraitScreen = orientation.includes(PORTRAIT);

    const portraitSize = width / 1.8;
    const landscapeSize = height;
    const playerSize = isPortraitScreen ? portraitSize : landscapeSize;

    return (
      <>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({ focus: !focus });
            this.resestFocus();
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
              ref={(ref) => (this.player = ref)}
              inputUrl={url}
              scaleMode={
                isPortraitScreen ? 'ScaleAspectFill' : 'ScaleAspectFit'
              }
              bufferTime={300}
              maxBufferTime={1000}
              autoplay={false}
              // onStatus={this_onStatus}
            />

            <PlayerAction open={focus} isPortraitScreen={isPortraitScreen} />
          </View>
        </TouchableWithoutFeedback>

        <StreamInfo open={focus} isPortraitScreen={isPortraitScreen} />
      </>
    );
  }
}

export default withScreenResize(Player);

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
});
