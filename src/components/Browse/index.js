import React from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import { FAB, Text, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { TabView, SceneMap } from 'react-native-tab-view';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ListCategory from './components/ListCategory';
import ListChannel from './components/ListChannel';
import Tabs from './components/Tabs';

const initialLayout = { width: Dimensions.get('window').width };
import Animated, { Easing, timing } from 'react-native-reanimated';

const { Value } = Animated;

const tabOffset = new Value(0);

const Browse = ({ theme }) => {
  const styles = useStyles();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Categories' },
    { key: 'second', title: 'Channel' },
  ]);

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
      <Text style={[styles.headText]}>
        Br<Text style={styles.primaryText}>o</Text>wse
      </Text>

      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: ListCategory,
          second: ListChannel,
        })}
        onIndexChange={onTabChange}
        renderTabBar={(props) => (
          <Tabs {...props} onPress={onTabChange} tabOffset={tabOffset} />
        )}
        initialLayout={initialLayout}
      />

      <FAB
        style={styles.fab}
        icon={({ color, size }) => (
          <Ionicons name="options-outline" color={color} size={size} />
        )}
        label="Filter And Sort"
        animated={false}
        uppercase={false}
        onPress={() => console.log('Pressed')}
        color={theme.colors.text}
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
  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    height: 46,
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
