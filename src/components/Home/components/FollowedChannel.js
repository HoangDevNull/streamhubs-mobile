import React from 'react';
import { View, Dimensions } from 'react-native';
import { Avatar, Badge, Headline, List } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { LeftItem, RigthItem } from './ChannelItem';
import { useSelector } from 'react-redux';

import { AVATAR_URL } from '../../../config';
import UserAvatar from '../../common/UserAvatar';

const ENTRIES1 = [
  {
    id: 1,
    username: 'Ninja',
    description: 'Follow us on social media',
    avatar:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/cef31105-8a6e-4211-a74b-2f0bbd9791fb-profile_image-150x150.png',
  },
  {
    id: 2,
    username: 'Aceu',
    description: `NRG aceu // W  !socials !aimlab`,
    avatar:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/c7a4c96e-a434-4dfa-9bcf-6190995dd536-profile_image-50x50.png',
  },
  {
    id: 3,
    username: 'ESL_CSGO',
    description:
      'RERUN: Team Liquid vs Vitality [Mirage] Map 3 - IEM Katowice 2021 - Group B',
    avatar:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/1975b18f-fa7d-443f-b191-fba08f92f3a2-profile_image-300x300.jpeg',
  },
  {
    id: 4,
    username: 'Fresh',
    description:
      'trio fncs finals!! || USE CODE FRESH || !socials !newvid !second !newchannel || #EpicPartner',
    avatar:
      'https://www.riotgames.com/darkroom/700/4589086aa1b8dc68fd0b6f052297a251:e7cd15652842615ca8f7a69e6eecde6d/tft-riot-site-card.jpg)',
  },
  {
    id: 5,
    username: 'x2Twins',
    description: 'FNCS WEEK 2 VIEWING PARTY',
    avatar: 'https://wallpapercave.com/wp/wp7048889.jpg',
  },
];

const { width: screenWidth } = Dimensions.get('window');
export const sliderWidth = screenWidth;

const FollowedChannel = () => {
  const styles = useStyles();
  const streamers = useSelector((state) => state.following.followedStreamer);

  return (
    <View styles={styles.container}>
      <List.Section>
        <List.Subheader>
          <Headline style={styles.headline}>Followed Channel</Headline>
        </List.Subheader>
        {streamers?.results?.map(({ username, id, userProfile }) => (
          <List.Item
            style={styles.item}
            onPress={() => console.log({ id })}
            key={String(id)}
            title={username}
            description={userProfile?.description}
            left={(props) => (
              <List.Icon
                {...props}
                icon={() => (
                  <UserAvatar
                    size={42}
                    src={
                      userProfile?.avatar
                        ? AVATAR_URL + userProfile.avatar
                        : null
                    }
                    onPress={null}
                  />
                )}
              />
            )}
            right={() => <Badge size={10} style={[styles.dot]} />}
            titleStyle={styles.headline}
          />
        ))}
      </List.Section>
    </View>
  );
};

export default React.memo(FollowedChannel);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginLeft: 5,
    marginBottom: 15,
  },
  headline: {
    fontFamily: 'Inter-Black',
  },
  dot: {
    position: 'absolute',
    top: 15,
    right: 0,
  },
}));
