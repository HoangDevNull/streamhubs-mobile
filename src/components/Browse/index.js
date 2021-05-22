import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import { FAB, Text, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { TabView } from 'react-native-tab-view';
import { Modalize } from 'react-native-modalize';
import Animated, { Easing, timing } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import {
  authRequest,
  filterChannelUrl,
  categoryFilterUrl,
} from '../../services';

import ListCategory from './components/ListCategory';
import ListChannel from './components/ListChannel';
import Tabs from './components/Tabs';
import FilterPanelHeader from './components/FilterPanelHeader';
import FilterPanelContent from './components/FilterPanelContent';
import axios from 'axios';

const initialLayout = { width: Dimensions.get('window').width };

const { Value } = Animated;

const tabOffset = new Value(0);

const defaultFilterPayload = {
  tags: [],
  orderBy: 1,
  page: 0,
};

const defaultRoutes = [
  { key: 'first', title: 'Categories' },
  { key: 'second', title: 'Channel' },
];

const categoryOrderbyValues = [
  { label: 'Descending', value: 1 },
  { label: 'Ascending', value: 2 },
  { label: 'Suggestion', value: 3 },
];
const channelOrderbyValues = [
  { label: 'Descending', value: 1 },
  { label: 'Ascending', value: 2 },
  { label: 'Newest', value: 3 },
  { label: 'Suggestion', value: 4 },
];

let source = null;

const filterAndSortAPI = async (
  accessToken,
  tabIndex,
  bodyData,
  tokenSource = null,
) => {
  const url = tabIndex === 1 ? filterChannelUrl : categoryFilterUrl;
  const payload = { ...defaultFilterPayload, ...bodyData };
  return await authRequest(url, 'POST', accessToken, payload, tokenSource);
};

const Browse = ({ theme }) => {
  const styles = useStyles();
  const accessToken = useSelector((state) => state.user?.access_token);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(defaultRoutes);
  const modalizeRef = useRef(null);
  const [filterPanelVisible, setFilterPanelVisible] = useState(true);
  const [categoriesData, setCategoriesData] = useState(null);
  const [channelsData, setChannelsData] = useState(null);
  const [paramsQueryCategory, setParamsQueryCategory] = useState(
    defaultFilterPayload,
  );
  const [paramsQueryChannel, setParamsQueryChannel] = useState(
    defaultFilterPayload,
  );

  const paramsQuery = [paramsQueryCategory, paramsQueryChannel];
  const setDatas = [setCategoriesData, setChannelsData];
  const setParamsQuery = [setParamsQueryCategory, setParamsQueryChannel];
  const pickerItems = [categoryOrderbyValues, channelOrderbyValues];

  const CancelToken = axios.CancelToken;

  const onTabChange = async (i) => {
    setIndex(i);
    timing(tabOffset, {
      duration: 400,
      toValue: i,
      easing: Easing.inOut(Easing.ease),
    }).start();

    source && source.cancel('Canceled previous request');
    source = CancelToken.source();

    await filterAndSortAPI(accessToken, i, paramsQuery[i], source.token)
      .then((response) => {
        if (i === 0) {
          setCategoriesData(response.data.results);
        }
        if (i === 1) {
          setChannelsData(response.data.results);
        }
      })
      .catch((error) => {
        console.log('Filter & sort ERROR: ', JSON.stringify(error));
      });
  };

  const onFilterPanelOpened = () => {
    setFilterPanelVisible(false);
  };

  const onFilterPanelClosed = () => {
    setFilterPanelVisible(true);
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  useEffect(() => {
    (async () => {
      source && source?.cancel('canceled previous request');
      source = CancelToken.source();
      await filterAndSortAPI(
        accessToken,
        index,
        paramsQuery[index],
        source.token,
      )
        .then((response) => {
          setDatas[index](response.data.results);
        })
        .catch((error) => {
          console.log('Filter & sort ERROR: ', JSON.stringify(error));
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsQueryCategory, paramsQueryChannel]);

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
        modalHeight={500}>
        <FilterPanelContent
          pickerItems={pickerItems[index]}
          payload={paramsQuery[index]}
          setPayload={setParamsQuery[index]}
          onClose={onClose}
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
