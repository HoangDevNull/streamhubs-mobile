import React from 'react';
import { withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { FlatList } from 'react-native-gesture-handler';

import CardChannel from './CardChannel';
const DATA = [];

const ListChannel = ({ dataItems }) => {
  const styles = useStyles();
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

const useStyles = makeStyles((theme) => ({}));
