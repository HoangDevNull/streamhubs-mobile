import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { ScrollView } from 'react-native-gesture-handler';

import VideoSlide from './components/VideoSlide';
import LiveChannel from './components/LiveChannel';
import SuggestChannel from './components/SuggestChannel';
import FollowedChannel from './components/FollowedChannel';

const Home = ({ navigation, theme }) => {
  const styles = useStyles();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.grid, styles.headText]}>
            F<Text style={styles.primaryText}>o</Text>ll
            <Text style={styles.pinkText}>o</Text>wing
          </Text>
          <VideoSlide />
          <View style={styles.grid}>
            <LiveChannel />
            <SuggestChannel />
            <FollowedChannel />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withTheme(Home);

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
  },
  grid: {
    marginTop: 15,
  },
  headText: {
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    fontFamily: 'Inter-Black',
    fontSize: 34,
    letterSpacing: 1.5,
  },
  pinkText: {
    fontFamily: 'Inter-Black',
    color: theme.colors.notification,
  },
  primaryText: {
    fontFamily: 'Inter-Black',
    color: theme.colors.primary,
  },
}));
