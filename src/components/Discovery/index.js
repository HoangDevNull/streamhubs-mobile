import React from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { Headline, Text, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import HeadSlider from './components/HeadSlider';
import CategoryBanner from '../common/CategoryBanner';
import { useScreenSize } from '../../hooks/useScreenSize';

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

const Discovery = ({ navigation, theme }) => {
  const styles = useStyles();
  const { width } = useScreenSize();
  const [numOfColumn, setNumOfColumn] = React.useState(3);

  React.useEffect(() => {
    setNumOfColumn(Math.floor(width / columnWidth));
  }, [width]);

  const _renderItem = ({ item, i }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => console.log('Pressed')}>
        <Image style={styles.categoryImage} source={{ uri: item.image }} />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <Text style={[styles.grid, styles.headText]}>
                Disc<Text style={styles.primaryText}>o</Text>very
              </Text>

              {/* Main */}
              <HeadSlider />
              <View style={[styles.grid]}>
                <Headline style={styles.headline}>Recommended For You</Headline>

                <CategoryBanner />
              </View>
            </View>
          </>
        }
        data={DATA}
        keyExtractor={({ id }) => String(id)}
        renderItem={_renderItem}
        numColumns={numOfColumn}
        key={numOfColumn}
      />
    </SafeAreaView>
  );
};

export default withTheme(Discovery);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  grid: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  headText: {
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    fontFamily: 'Inter-Black',
    fontSize: 34,
    letterSpacing: 1.5,
  },
  pinkText: {
    fontFamily: 'Inter-Black',
    color: theme.colors.notification,
  },
  primaryText: {
    fontFamily: 'Inter-Black',
    color: theme.colors.primary,
  },
  categoryImage: {
    width: columnWidth,
    height: 140,
    marginVertical: 15,
    marginLeft: 15,
    borderRadius: 13,
    resizeMode: 'cover',
  },
  headline: {
    fontFamily: 'Inter-Black',
  },
}));
