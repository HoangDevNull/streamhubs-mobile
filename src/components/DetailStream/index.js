import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import DismissKeyboard from '../common/DismissKeyboard';
import Player from './Main';
import ChatInput from './components/ChatInput';
import { useScreenSize } from '../../hooks/useScreenSize';

const DetailStream = ({ route, theme }) => {
  const styles = useStyles();
  const { isPortrait } = useScreenSize();

  return (
    <DismissKeyboard style={styles.container}>
      {/* Player : Monitor screen , Stream info, Chat content */}
      <View style={styles.head}>
        <Player url="rtmp://192.168.1.6/live/test" />
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
