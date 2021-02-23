import React from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Head from './components/Head';
import Chat from './components/Chat';
import DismissKeyboard from '../common/DismissKeyboard';
import Player from './components/Player';

const DetailStream = ({ route, theme }) => {
  const { id: userID, streamName } = route.params;

  const styles = useStyles();

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <View style={styles.player}>
            <Player url="rtmp://192.168.1.5/live/test" />
          </View>
          <View style={styles.main}>
            <Head />
            <Chat />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default withTheme(DetailStream);

const useStyles = makeStyles((theme) => ({
  root: {
    // flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  fontBold: {
    fontFamily: 'Inter-Bold',
  },
  player: {
    width: '100%',
    height: 'auto',
    backgroundColor: theme.colors.backdrop,
  },
  image: {
    flex: 1,
    height: 198,
    resizeMode: 'cover',
  },
  main: {
    flex: 1,
  },
}));
