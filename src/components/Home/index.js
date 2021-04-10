import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { ActivityIndicator, Text, withTheme, Colors } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { useSelector, useDispatch } from 'react-redux';

import CategorySlider from './components/CategorySlider';
import LiveChannel from './components/LiveChannel';
import SuggestChannel from './components/SuggestChannel';
import FollowedChannel from './components/FollowedChannel';

// Request
import {
  authRequest,
  randomCategoriesURL,
  subChannelURL,
  suggestChannelURL,
  streamerFollowedURL,
} from '../../services';
import { initFollowingData } from '../../redux/actions/following';

const Home = ({ navigation, theme }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.user?.access_token);
  const [isLoading, setIsLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchData = React.useCallback(async () => {
    const category = authRequest(randomCategoriesURL, 'POST', access_token);
    const subcribeChannel = authRequest(subChannelURL, 'POST', access_token, {
      channelStatus: 0,
    });
    const sugChannel = authRequest(suggestChannelURL, 'POST', access_token, {
      channelStatus: 0,
    });
    const streamer = authRequest(streamerFollowedURL, 'POST', access_token, {
      page: 0,
      offset: 10,
    });
    const [
      { data: categories },
      { data: liveChannel },
      { data: suggestChannel },
      { data: followedStreamer },
    ] = await Promise.all([category, subcribeChannel, sugChannel, streamer]);

    dispatch(
      initFollowingData({
        categories,
        liveChannel,
        suggestChannel,
        followedStreamer,
      }),
    );
  }, [access_token, dispatch]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchData();
      setRefreshing(false);
    } catch (err) {
      setRefreshing(false);
    }
  }, [fetchData]);

  React.useEffect(() => {
    console.log('run first');
    (async () => {
      try {
        await fetchData();
        setIsLoading(false);
      } catch (err) {
        console.log({ err });
        setIsLoading(false);
      }
    })();
  }, [fetchData]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          animating={isLoading}
          size="large"
          color={Colors.purple600}
        />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Text style={[styles.grid, styles.headText]}>
            F<Text style={styles.primaryText}>o</Text>ll
            <Text style={styles.pinkText}>o</Text>wing
          </Text>

          {/* Main */}
          <CategorySlider />
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  container: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
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
