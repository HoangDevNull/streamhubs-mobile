import React from 'react';
import { Title, withTheme } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import CardCategory from './CardCategory';
import { View } from 'react-native';
import NoResultFound from './NoResultFound';

const ListCategory = ({ dataItems }) => {
  const _renderItem = ({ item, i }) => {
    return <CardCategory dataItem={item} />;
  };

  return (
    <FlatList
      data={dataItems}
      keyExtractor={({ id }) => String(id)}
      renderItem={_renderItem}
      ListEmptyComponent={<NoResultFound />}
    />
  );
};

export default withTheme(ListCategory);
