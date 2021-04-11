import React, { memo } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Portal, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { useSelector, useDispatch } from 'react-redux';

import { useScreenSize } from '../../hooks/useScreenSize';
import { initStreamData } from '../../redux/actions/detailStream';

import PlayerSetting from './components/PlayerSetting';
import DismissKeyboard from '../common/DismissKeyboard';
import Player from './Main';
import ChatInput from './components/ChatInput';

const DetailStream = ({ route, theme }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { isPortrait } = useScreenSize();
  const resolution = useSelector((state) => state.player.resolution);
  const socket = useSelector((state) => state.socket?.socketInstance);

  React.useEffect(() => {
    const channel = route?.params;
    if (channel && socket) {
      dispatch(initStreamData(channel));
      // Join channel using endpoint
      socket.emit('joinLiveChannel', {
        endPoint: channel?.endPoint,
        channelID: route.params?.id,
      });
    }

    return () => {
      socket.emit('leaveLiveChannel', channel?.endPoint);
    };
  }, [route.params, socket, dispatch]);

  let stream_url = 'rtmp://103.130.218.62/live/test';
  if (resolution === 'auto') {
    // temporary solution. Need to enhance in future
    stream_url = 'rtmp://103.130.218.62/live/test';
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

export default withTheme(memo(DetailStream));

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
    paddingHorizontal: 8,
  },
  hide: {},
}));
