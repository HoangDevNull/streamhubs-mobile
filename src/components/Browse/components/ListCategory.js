import React from 'react';
import { withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { FlatList } from 'react-native-gesture-handler';

import CardCategory from './CardCategory';
const DATA = [
  {
    id: 1,
    image:
      'https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/blt5abbad4f1d1da663/602457cff4a7946af0338221/LOL_Key_Art_2021_318x428_RiotBar.jpg??&format=pjpg&quality=85',
  },
  {
    id: 2,
    image:
      'https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/bltfb12cd79b2ec9643/5f5c2534806bc7495596e2e6/TFT_Fates_GameCard_v4.jpg??&format=pjpg&quality=85',
  },
  {
    id: 3,
    image:
      'https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/blt3e7d3ffb580f8d00/5fd816d7752123476ba04b32/Riot_Bar_Application_Switcher_Game_Card.jpg??&format=pjpg&quality=85',
  },
  {
    id: 4,
    image:
      'https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/blt5abbad4f1d1da663/602457cff4a7946af0338221/LOL_Key_Art_2021_318x428_RiotBar.jpg??&format=pjpg&quality=85',
  },
  {
    id: 5,
    image:
      'https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/bltfb12cd79b2ec9643/5f5c2534806bc7495596e2e6/TFT_Fates_GameCard_v4.jpg??&format=pjpg&quality=85',
  },
  {
    id: 6,
    image:
      'https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/blt3e7d3ffb580f8d00/5fd816d7752123476ba04b32/Riot_Bar_Application_Switcher_Game_Card.jpg??&format=pjpg&quality=85',
  },
  {
    id: 7,
    image:
      'https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/blt5abbad4f1d1da663/602457cff4a7946af0338221/LOL_Key_Art_2021_318x428_RiotBar.jpg??&format=pjpg&quality=85',
  },
  {
    id: 8,
    image:
      'https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/bltfb12cd79b2ec9643/5f5c2534806bc7495596e2e6/TFT_Fates_GameCard_v4.jpg??&format=pjpg&quality=85',
  },
  {
    id: 9,
    image:
      'https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/blt3e7d3ffb580f8d00/5fd816d7752123476ba04b32/Riot_Bar_Application_Switcher_Game_Card.jpg??&format=pjpg&quality=85',
  },
];

const columnWidth = 110;

const Category = () => {
  const styles = useStyles();
  const _renderItem = ({ item, i }) => {
    return <CardCategory />;
  };

  return (
    <FlatList
      data={DATA}
      keyExtractor={({ id }) => String(id)}
      renderItem={_renderItem}
    />
  );
};

export default withTheme(Category);

const useStyles = makeStyles((theme) => ({}));
