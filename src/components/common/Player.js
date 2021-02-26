/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Paragraph, Subheading, withTheme } from 'react-native-paper';
import { NodePlayerView } from 'react-native-nodemediaclient';

import withResize from '../../hoc/withScreenResize';
import UserAvatar from './UserAvatar';
import ViewerBadge from './ViewerBadge';
import LiveBadge from './LiveBadge';

export const calcPlayerHeight = ({ width, height, isPortrait }) => {
  const portraitSize = width / 1.8;
  const landscapeSize = height;
  const playerHeight = isPortrait ? portraitSize : landscapeSize;
  return playerHeight;
};

class Player extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.player = React.createRef(null);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  start = () => {
    this.player.start();
  };

  stop = () => {
    this.player.stop();
  };

  pause = () => {
    this.player.pause();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    // Props from parent
    const { screenSize, url } = this.props;
    const { isPortrait } = screenSize;

    // Player
    const playerHeight = calcPlayerHeight(screenSize);

    return (
      <Card
        onPress={() => console.log('prest')}
        elevation={0}
        style={styles.container}>
        <Card.Content style={styles.wrapper}>
          <View>
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
              renderType="TEXTUREVIEW"
              // onStatus={this_onStatus}
            />
            <LiveBadge position="top" />
            <ViewerBadge backdrop position="bottom" count="8,222" />
          </View>
        </Card.Content>
        <Card.Actions style={styles.cardAction}>
          <UserAvatar size={40} />
          <View style={styles.textWrapper}>
            <Subheading style={styles.fontBold}>Ninja</Subheading>

            <Paragraph numberOfLines={1}>Follow us on social now !!!</Paragraph>
          </View>
        </Card.Actions>
      </Card>
    );
  }
}

export default withTheme(withResize(React.memo(Player)));

const styles = StyleSheet.create({
  player: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 500,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    overflow: 'visible',
    backgroundColor: 'transparent',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    height: 178,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  cardAction: {
    flexDirection: 'row',
  },
  textWrapper: {
    marginLeft: 20,
  },
  fontBold: {
    fontFamily: 'Inter-Bold',
  },
});
