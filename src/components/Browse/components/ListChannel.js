import React from 'react';
import { withTheme } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import CardChannel from './CardChannel';

const ListChannel = ({ dataItems }) => {
  const _renderItem = ({ item, i }) => {
    return <CardChannel dataItem={item} />;
  };

  return (
    <FlatList
      data={dataItems}
      keyExtractor={({ id }) => String(id)}
      renderItem={_renderItem}
    />
  );
};

export default withTheme(ListChannel);
