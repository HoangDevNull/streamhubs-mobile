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

export const calcScreen = ({ width, height, isPortrait }) => {
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
    const { isPortrait } = screenSize;
    const playerHeight = calcScreen(screenSize);

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
              style={{
                position: 'absolute',
                top: focus ? playerHeight + 125 : playerHeight,
              }}>
              {/* Chat main */}
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
});
