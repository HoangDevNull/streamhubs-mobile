import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import SearchBar from './components/SearchBar';
import ItemResult from './components/ItemResult';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dataItems, setDataItems] = useState([
    { id: 1, name: 'This is item channel', isChannel: true },
    { id: 2, name: 'This is categor' },
  ]);

  useEffect(() => {
    // effect
    // return () => {
    //     cleanup
    // }
  }, [searchQuery]);

  const _renderItem = ({ item, i }) => {
    return <ItemResult dataItem={item} />;
  };

  return (
    <View>
      <SearchBar searchValue={searchQuery} onChange={setSearchQuery} />
      <FlatList
        data={dataItems}
        keyExtractor={({ id }) => String(id)}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default withTheme(Search);
