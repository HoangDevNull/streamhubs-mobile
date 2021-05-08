import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, View } from 'react-native';
import { FAB, Text, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Modalize } from 'react-native-modalize';
import Animated, { Easing, timing } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ListCategory from './components/ListCategory';
import ListChannel from './components/ListChannel';
import Tabs from './components/Tabs';
import FilterPanelHeader from './components/FilterPanelHeader';
import FilterPanelContent from './components/FilterPanelContent';

const initialLayout = { width: Dimensions.get('window').width };

const { Value } = Animated;

const tabOffset = new Value(0);

const Browse = ({ theme }) => {
  const styles = useStyles();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Categories' },
    { key: 'second', title: 'Channel' },
  ]);
  const modalizeRef = useRef(null);
  const [filterPanelVisible, setFilterPanelVisible] = useState(true);
  const [data, setData] = useState(null);

  const onTabChange = (i) => {
    setIndex(i);
    timing(tabOffset, {
      duration: 400,
      toValue: i,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  const onFilterPanelOpened = () => {
    setFilterPanelVisible(false);
  };

  const onFilterPanelClosed = () => {
    setFilterPanelVisible(true);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <ListCategory data={data} />;
      case 'second':
        return <ListChannel data={data} />;
      default:
        return null;
    }
  };
  useEffect(() => {
    data && console.log(data);
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.headText]}>
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

      <FAB
        visible={filterPanelVisible}
        style={styles.fab}
        icon={({ color, size }) => (
          <Ionicons name="options-outline" color={color} size={size} />
        )}
        label="Filter And Sort"
        animated={false}
        uppercase={false}
        onPress={() => modalizeRef.current?.open()}
        color={theme.colors.text}
      />
      <Modalize
        ref={modalizeRef}
        modalStyle={styles.filterPanel}
        childrenStyle={styles.childrenFilterPanel}
        HeaderComponent={<FilterPanelHeader />}
        onOpen={onFilterPanelOpened}
        onClose={onFilterPanelClosed}
        modalHeight={300}>
        <FilterPanelContent tabIndex={index} onDataBinding={setData} />
      </Modalize>
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
  filterPanel: {
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    // flex: 1,
  },
  childrenFilterPanel: {
    flex: 1,
  },
}));
