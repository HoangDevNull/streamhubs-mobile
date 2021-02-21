import React from 'react';
import { View, Dimensions } from 'react-native';
import {
  Text,
  Card,
  withTheme,
  Badge,
  Headline,
  List,
} from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
const ENTRIES1 = [
  {
    name: 'LOL',
    viewer: 430,
    banner:
      'https://www.riotgames.com/darkroom/700/ff82d668da3b61325a4d9a00f0d4bad2:8c97ff73a96ae9fe351eeebae2220a5e/lol-key-art-2021-1920x1080-article-banner.jpg',
  },
  {
    name: 'Earlier this morning, NYC',
    viewer: 400,
    banner:
      'https://www.riotgames.com/darkroom/700/a1833b4d5367d801178f49057ce2daa9:e33fb2751ba9703e7b1f47f4eb1ab7fb/riot-games-1920x1080-valorant-asset.jpg',
  },
  {
    name: 'White Pocket Sunset',
    viewer: 320,
    banner:
      'https://www.riotgames.com/darkroom/700/b313a88e7a60ba9ddb4b2b3f78700aab:40870d3d4e320a0f39b685e84970d759/wr-banner-ziggs-nov.jpg',
  },
  {
    name: 'Acrocorinth, Greece',
    viewer: 300,
    banner:
      'https://www.riotgames.com/darkroom/700/4589086aa1b8dc68fd0b6f052297a251:e7cd15652842615ca8f7a69e6eecde6d/tft-riot-site-card.jpg)',
  },
  {
    name: 'The lone tree, majestic landscape of New Zealand',
    viewer: 230,
    banner: 'https://wallpapercave.com/wp/wp7048889.jpg',
  },
];
const { width: screenWidth } = Dimensions.get('window');
export const sliderWidth = screenWidth;

export const LeftItem = ({ theme }) => {
  const styles = useStyles();
  return (
    <Card style={styles.card}>
      <Card.Cover
        style={styles.coverImage}
        source={{ uri: 'https://wallpapercave.com/wp/wp7048889.jpg' }}
      />
    </Card>
  );
};
export const RigthItem = ({ theme }) => {
  const styles = useStyles();
  return (
    <Card style={styles.card}>
      <Card.Cover
        style={styles.coverImage}
        source={{ uri: 'https://wallpapercave.com/wp/wp7048889.jpg' }}
      />
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontFamily: 'Inter-Bold',
  },
  card: {
    width: 180,
    height: 90,
    borderRadius: 15,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
}));
