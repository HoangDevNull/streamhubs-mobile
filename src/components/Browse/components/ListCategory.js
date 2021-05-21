import React from 'react';
import { withTheme } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import CardCategory from './CardCategory';

const ListCategory = ({ dataItems }) => {
  const _renderItem = ({ item, i }) => {
    return <CardCategory dataItem={item} />;
  };

  return (
    <FlatList
      data={dataItems}
      keyExtractor={({ id }) => String(id)}
      renderItem={_renderItem}
    />
  );
};

export default withTheme(ListCategory);
