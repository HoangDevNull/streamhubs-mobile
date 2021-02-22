import React from 'react';
import { Dimensions, SafeAreaView, View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { TabView, SceneMap } from 'react-native-tab-view';
import ListCategory from './components/ListCategory';
import ListChannel from './components/ListChannel';
import Tabs from './components/Tabs';

const initialLayout = { width: Dimensions.get('window').width };
import Animated, { Easing, timing } from 'react-native-reanimated';

const { multiply, Extrapolate, set, interpolate, Value } = Animated;

const tabOffset = new Value(0);

const Browse = ({ theme }) => {
  const styles = useStyles();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Categories' },
    { key: 'second', title: 'Channel' },
  ]);

  const renderScene = SceneMap({
    first: ListCategory,
    second: ListChannel,
  });

  const onTabChange = (i) => {
    setIndex(i);
    timing(tabOffset, {
      duration: 400,
      toValue: i,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.grid, styles.headText]}>
        Br<Text style={styles.primaryText}>o</Text>wse
      </Text>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onTabChange}
        renderTabBar={(props) => (
          <Tabs {...props} onPress={onTabChange} tabOffset={tabOffset} />
        )}
        initialLayout={initialLayout}
      />
    </SafeAreaView>
  );
};

export default withTheme(React.memo(Browse));

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  grid: {
    // marginTop: 15,
    // paddingHorizontal: 15,
  },
  headText: {
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    fontFamily: 'Inter-Black',
    fontSize: 34,
    letterSpacing: 1.5,
  },
  primaryText: {
    fontFamily: 'Inter-Black',
    color: theme.colors.primary,
  },
}));
