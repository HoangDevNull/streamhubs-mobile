/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Paragraph, Subheading, withTheme } from 'react-native-paper';

import UserAvatar from './UserAvatar';
import ViewerBadge from './ViewerBadge';
import LiveBadge from './LiveBadge';

import { ROOT_API } from '../../config';
import { useNavigation } from '@react-navigation/core';
const Player = ({ channel }) => {
  const navigation = useNavigation();
  const [imgUri, setImgUri] = React.useState(
    ROOT_API + `/thumbnail/${channel?.endPoint}.png`,
  );

  return (
    <Card
      onPress={() => navigation.navigate('DetailStream', channel)}
      elevation={0}
      style={styles.container}>
      <Card.Content style={styles.wrapper}>
        <View>
          <Image
            source={{
              uri: imgUri,
            }}
            onError={() => setImgUri(channel?.banner)}
            style={styles.player}
          />
          <LiveBadge position="top" />
          <ViewerBadge backdrop position="bottom" count={channel?.viewers} />
        </View>
      </Card.Content>
      <Card.Actions style={styles.cardAction}>
        <UserAvatar
          size={40}
          src={channel?.owner?.userProfile?.avatar || null}
        />
        <View style={styles.textWrapper}>
          <Subheading style={styles.fontBold}>
            {channel?.owner?.username}
          </Subheading>
          <Paragraph numberOfLines={1}>{channel?.description}</Paragraph>
        </View>
      </Card.Actions>
    </Card>
  );
};

export default withTheme(React.memo(Player));

const styles = StyleSheet.create({
  player: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    overflow: 'visible',
    backgroundColor: 'transparent',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    height: 178,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  cardAction: {
    flexDirection: 'row',
  },
  textWrapper: {
    marginLeft: 20,
  },
  fontBold: {
    fontFamily: 'Inter-Bold',
  },
});
