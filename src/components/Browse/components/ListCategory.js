import React from 'react';
import { withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { FlatList } from 'react-native-gesture-handler';

import CardCategory from './CardCategory';
const DATA = [
  {
    id: 2,
    name: 'Grand Theft Auto V',
    description: '',
    banner:
      'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1920x1080_Hero-Carousel_V06-1920x1080-1503e4b1320d5652dd4f57466c8bcb79424b3fc0.jpg?h=1080&resize=1&w=1920',
    follower: 210,
    createdAt: '2021-05-05T04:16:50.853Z',
    updatedAt: '2021-05-05T04:16:50.853Z',
    tags: [
      {
        id: 0,
        name: 'Gaming',
        color: 'pink400',
      },
      {
        id: 2,
        name: 'Moba',
        color: 'teal400',
      },
    ],
  },
  {
    id: 0,
    name: 'Just Chatting',
    description: '',
    banner:
      'https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-285x380.jpg',
    follower: 200,
    createdAt: '2021-05-05T04:16:50.853Z',
    updatedAt: '2021-05-05T04:16:50.853Z',
    tags: [
      {
        id: 0,
        name: 'Gaming',
        color: 'pink400',
      },
      {
        id: 1,
        name: 'Esport',
        color: 'green400',
      },
    ],
  },
];

const columnWidth = 110;

const ListCategory = ({ dataItems }) => {
  const styles = useStyles();
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

const useStyles = makeStyles((theme) => ({}));
