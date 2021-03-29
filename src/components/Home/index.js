import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import CategorySlider from './components/CategorySlider';
import LiveChannel from './components/LiveChannel';
import SuggestChannel from './components/SuggestChannel';
import FollowedChannel from './components/FollowedChannel';

// Request
import {
  authRequest,
  randomCategoriesURL,
  subChannelsURL,
} from '../../services';
import { initFollowingData } from '../../redux/actions/following';

const Home = ({ navigation, theme }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.user?.access_token);
  React.useEffect(() => {
    (async () => {
      const category = authRequest(randomCategoriesURL, 'POST', access_token);
      const subcribeChannel = authRequest(subChannelsURL, 'POST', access_token);
      try {
        const [
          { data: categories },
          { data: liveChannel },
        ] = await Promise.all([category, subcribeChannel]);
        dispatch(initFollowingData({ categories, liveChannel }));
      } catch (err) {
        console.log({ err });
      }
    })();
  }, [access_token, dispatch]);

  return (
    <SafeAreaView>
      <ScrollView>
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
