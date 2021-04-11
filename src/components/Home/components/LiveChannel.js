import React from 'react';
import { View, Dimensions } from 'react-native';
import { Headline, List } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { useNavigation } from '@react-navigation/native';

import { LeftItem, RigthItem } from './ChannelItem';
import { useSelector } from 'react-redux';
const ENTRIES1 = [
  {
    id: 1,
    username: 'Ninja',
    title: 'Follow us on social media',
    categories: [
      { id: 2, color: 'green400', name: 'Gaming' },
      { id: 3, color: 'yellow800', name: 'Esport' },
    ],
    image:
      'https://www.riotgames.com/darkroom/700/ff82d668da3b61325a4d9a00f0d4bad2:8c97ff73a96ae9fe351eeebae2220a5e/lol-key-art-2021-1920x1080-article-banner.jpg',
  },
  {
    id: 2,
    username: 'Aceu',
    title: `NRG aceu // W  !socials !aimlab`,
    categories: [
      { id: 1, color: 'pink400', name: 'Chating' },
      { id: 2, color: 'green400', name: 'Gaming' },
      { id: 3, color: 'purple400', name: 'MOBA' },
    ],
    image:
      'https://www.riotgames.com/darkroom/700/a1833b4d5367d801178f49057ce2daa9:e33fb2751ba9703e7b1f47f4eb1ab7fb/riot-games-1920x1080-valorant-asset.jpg',
  },
  {
    id: 3,
    username: 'ESL_CSGO',
    title:
      'RERUN: Team Liquid vs Vitality [Mirage] Map 3 - IEM Katowice 2021 - Group B',
    categories: [
      { id: 1, color: 'pink400', name: 'Chating' },
      { id: 2, color: 'green400', name: 'Gaming' },
      { id: 3, color: 'yellow800', name: 'Esport' },
    ],
    image:
      'https://www.riotgames.com/darkroom/700/b313a88e7a60ba9ddb4b2b3f78700aab:40870d3d4e320a0f39b685e84970d759/wr-banner-ziggs-nov.jpg',
  },
  {
    id: 4,
    username: 'Fresh',
    title:
      'trio fncs finals!! || USE CODE FRESH || !socials !newvid !second !newchannel || #EpicPartner',
    categories: [
      { id: 1, color: 'pink400', name: 'English' },
      { id: 2, color: 'green400', name: 'Gaming' },
      { id: 3, color: 'yellow800', name: 'Esport' },
    ],
    image:
      'https://www.riotgames.com/darkroom/700/4589086aa1b8dc68fd0b6f052297a251:e7cd15652842615ca8f7a69e6eecde6d/tft-riot-site-card.jpg)',
  },
  {
    id: 5,
    username: 'x2Twins',
    title: 'FNCS WEEK 2 VIEWING PARTY',
    categories: [
      { id: 1, color: 'pink400', name: 'Chating' },
      { id: 2, color: 'green400', name: 'Gaming' },
      { id: 3, color: 'yellow800', name: 'Esport' },
    ],
    image: 'https://wallpapercave.com/wp/wp7048889.jpg',
  },
];

const { width: screenWidth } = Dimensions.get('window');
export const sliderWidth = screenWidth;

const LiveChannel = () => {
  const navigation = useNavigation();
  const styles = useStyles();
  const channels = useSelector((state) => state.following.liveChannel);

  return (
    <View styles={styles.container}>
      <List.Section>
        <List.Subheader>
          <Headline style={styles.headline}>Live Channel</Headline>
        </List.Subheader>
        {channels.map((channel) => (
          <List.Item
            style={styles.item}
            onPress={() => {
              navigation.navigate('DetailStream', channel);
            }}
            key={channel.id}
            left={() => <LeftItem uri={channel.banner} />}
            right={() => <RigthItem data={channel} />}
          />
        ))}
      </List.Section>
    </View>
  );
};

export default React.memo(LiveChannel);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    paddingLeft: 15,
    marginBottom: 15,
  },
  headline: {
    fontFamily: 'Inter-Black',
  },
}));
