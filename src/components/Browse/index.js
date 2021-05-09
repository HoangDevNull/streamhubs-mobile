import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, View } from 'react-native';
import { FAB, Text, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Modalize } from 'react-native-modalize';
import Animated, { Easing, timing } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { authRequest, channelFilter, categoryFilter } from '../../services';

import ListCategory from './components/ListCategory';
import ListChannel from './components/ListChannel';
import Tabs from './components/Tabs';
import FilterPanelHeader from './components/FilterPanelHeader';
import FilterPanelContent from './components/FilterPanelContent';

const initialLayout = { width: Dimensions.get('window').width };

const { Value } = Animated;

const tabOffset = new Value(0);

const defaultSortedPayload = {
  tags: [],
  orderBy: 1,
  page: 0,
  // offset: 10,
};

const filterAndSortAPI = async (accessToken, tabIndex, bodyData) => {
  const url = tabIndex === 1 ? channelFilter : categoryFilter;
  const payload = { ...defaultSortedPayload, ...bodyData };
  console.log('PAYLOAD: ', payload);
  console.log('Access token: ', accessToken);
  console.log('URL: ', url);
  return await authRequest(url, 'POST', accessToken, payload);
};

const Browse = ({ theme }) => {
  const styles = useStyles();
  const accessToken = useSelector((state) => state.user?.access_token);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Categories' },
    { key: 'second', title: 'Channel' },
  ]);
  const modalizeRef = useRef(null);
  const [filterPanelVisible, setFilterPanelVisible] = useState(true);
  const [categoriesData, setCategoriesData] = useState(null);
  const [channelsData, setChannelsData] = useState(null);
  const [sortedCategoryValue, setSortedCategoryValue] = useState(1);
  const [sortedChannelValue, setSortedChannelValue] = useState(1);

  const setDatas = [setCategoriesData, setChannelsData];
  const sortedValues = [sortedCategoryValue, sortedChannelValue];
  const setSortedValues = [setSortedCategoryValue, setSortedChannelValue];

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

  useEffect(() => {
    // console.log('Chay vo day');
    console.log('ACCESS TOKEN: ', accessToken);
    (async () => {
      const bodyData = { orderBy: sortedValues[index] };
      await filterAndSortAPI(accessToken, index, bodyData)
        .then((response) => {
          // if (index === 0) setCategoriesData(response.data.results);
          // if (index === 1) setChannelsData(response.data.results);
          setDatas[index](response.data.results);
        })
        .catch((error) => {
          console.log('Filter & sort ERROR: ', JSON.stringify(error));
          alert('Somethings wrong!!!');
        });
    })();
  }, [sortedValues, index]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <ListCategory dataItems={categoriesData} />;
      case 'second':
        return <ListChannel dataItems={channelsData} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.headText]}>
        Br<Text style={styles.primaryText}>o</Text>wse
      </Text>

      <TabView
        lazy
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
        <FilterPanelContent
          tabIndex={index}
          sortedValue={sortedValues[index]}
          setSortedValue={setSortedValues[index]}
        />
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
