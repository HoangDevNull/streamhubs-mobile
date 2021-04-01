import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Portal, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import DismissKeyboard from '../common/DismissKeyboard';
import Player from './Main';
import ChatInput from './components/ChatInput';
import { useScreenSize } from '../../hooks/useScreenSize';
import PlayerSetting from './components/PlayerSetting';
import { useSelector } from 'react-redux';

const DetailStream = ({ route, theme }) => {
  const styles = useStyles();
  const { isPortrait } = useScreenSize();
  const resolution = useSelector((state) => state.player.resolution);

  let stream_url = 'rtmp://192.168.1.4/live/test';
  if (resolution === 'auto') {
    // temporary solution. Need to enhance in future
    stream_url = 'rtmp://192.168.1.4/live/test';
  } else {
    stream_url += `_${resolution}`;
  }

  return (
    <Portal.Host>
      <DismissKeyboard style={styles.container}>
        {/* Player : Monitor screen , Stream info, Chat content */}
        <View style={styles.head}>
          <Player url={stream_url} />
        </View>

        {/* Keyboard*/}
        {isPortrait && (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            <View style={styles.foot}>
              <ChatInput />
            </View>
          </KeyboardAvoidingView>
        )}
      </DismissKeyboard>
      <PlayerSetting />
    </Portal.Host>
  );
};

export default withTheme(DetailStream);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  head: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  foot: {
    marginTop: 'auto',
    backgroundColor: theme.colors.background,
    paddingBottom: 10,
    paddingHorizontal: 8,
  },
  hide: {},
}));
