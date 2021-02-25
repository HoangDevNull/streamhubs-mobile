import React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import DismissKeyboard from '../common/DismissKeyboard';
import Player from './components/Player';
import ChatInput from './components/Chat/ChatInput';
import { useScreenSize } from '../../hooks/useScreenSize';

export const calcScreen = ({ width, height, orientation }) => {
  const portraitSize = width / 1.8;
  const landscapeSize = height;
  const isPortraitScreen = orientation.includes('PORTRAIT');
  const playerHeight = isPortraitScreen ? portraitSize : landscapeSize;
  return { playerHeight, isPortraitScreen };
};

const DetailStream = ({ route, theme }) => {
  const styles = useStyles();

  // width, height, orientation
  const screen = useScreenSize();

  const { playerHeight, isPortraitScreen } = calcScreen(screen);
  console.log({ height: Dimensions.get('window').height });
  return (
    <DismissKeyboard style={styles.container}>
      {/* Sticky header */}
      <View style={styles.head}>
        <Player
          playerHeight={playerHeight}
          isPortraitScreen={isPortraitScreen}
          url="rtmp://192.168.1.6/live/test"
        />
      </View>

      {/* Avoid keyboard push up */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <View
          style={[
            styles.foot,
            {
              height: 'auto',
            },
          ]}>
          <ChatInput />
        </View>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

export default withTheme(DetailStream);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  head: {
    backgroundColor: 'green',
    flex: 1,
    zIndex: 5,
  },
  foot: {
    zIndex: 1,
    marginTop: 'auto',
    backgroundColor: theme.colors.background,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
}));
