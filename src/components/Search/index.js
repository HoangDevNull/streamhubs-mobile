import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import SearchBar from './components/SearchBar';
import ItemResult from './components/ItemResult';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { authRequest, search } from '../../services';
import { useSelector } from 'react-redux';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

let source = null;

const searchAPI = async (query, accessToken, tokenSource) => {
  const payload = {
    searchKey: query,
    page: 0,
    // "offset": 10
  };
  return await authRequest(search, 'POST', accessToken, payload, tokenSource);
};

const Search = () => {
  const accessToken = useSelector((state) => state.user?.access_token);
  const [searchQuery, setSearchQuery] = useState('');
  const [dataItems, setDataItems] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const CancelToken = axios.CancelToken;
  const styles = useStyles();

  useEffect(() => {
    source && source.cancel('Canceled previous request search');
    source = CancelToken.source();
    if (searchQuery) {
      const timerSearch = setTimeout(async () => {
        await searchAPI(searchQuery, accessToken, source.token)
          .then((response) => {
            const { channels, categories } = response.data;
            const total = channels.total + categories.total;
            const data = [...channels.results, ...categories.results];
            setTotalItem(total);
            setDataItems(data);
          })
          .catch((error) => {
            setTotalItem(0);
            setDataItems([]);
            console.log('Search Query Error: ', JSON.stringify(error));
          });
      }, 500);
      return () => clearTimeout(timerSearch);
    } else {
      setTotalItem(0);
      setDataItems([]);
    }
  }, [searchQuery]);

  const _renderItem = ({ item, i }) => {
    return <ItemResult dataItem={item} />;
  };
  const ListEmpty = () => {
    return (
      <View style={styles.listEmptyContainer}>
        <Text style={styles.listEmptyLabel}>No results found!</Text>
      </View>
    );
  };
  const ListHeader = React.useMemo(() => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderLabel}>Totals: {totalItem}</Text>
      </View>
    );
  }, [totalItem]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar searchValue={searchQuery} onChange={setSearchQuery} />
      {totalItem > 0 ? ListHeader : null}
      <FlatList
        keyboardShouldPersistTaps="never"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.flatList}
        data={dataItems}
        keyExtractor={({ id }) => String(Math.random() * 10000)}
        renderItem={_renderItem}
        ListEmptyComponent={<ListEmpty />}
      />
    </SafeAreaView>
  );
};

export default withTheme(Search);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  listEmptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  listEmptyLabel: {
    color: theme.colors.primary,
    fontSize: 20,
  },
  listHeader: {
    marginHorizontal: 20,
    marginBottom: 5,
  },
  listHeaderLabel: {
    color: theme.colors.primary,
    fontSize: 12,
  },
  flatList: {
    flexGrow: 1,
  },
}));
