import React from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { Banner, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Head from './components/Head2';
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
          <Player url="rtmp://192.168.1.6/live/test" />

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
  image: {
    flex: 1,
    height: 198,
    resizeMode: 'cover',
  },
  main: {
    flex: 1,
  },
}));
