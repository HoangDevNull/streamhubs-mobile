import React from 'react';
import { View, Dimensions } from 'react-native';
import { Headline, List } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { useNavigation } from '@react-navigation/native';

import { LeftItem, RigthItem } from './ChannelItem';
import { useSelector } from 'react-redux';
import { ROOT_API } from '../../../config';

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
            left={() => (
              <LeftItem
                uriFallBack={channel.banner}
                uri={ROOT_API + `/thumbnail/${channel.endPoint}.png`}
              />
            )}
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
