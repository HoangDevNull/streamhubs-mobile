import React from 'react';
import { View, Dimensions } from 'react-native';
import { Headline, List } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { LeftItem, RigthItem } from './ChannelItem';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

const { width: screenWidth } = Dimensions.get('window');
export const sliderWidth = screenWidth;

const SuggestChannel = () => {
  const navigation = useNavigation();
  const styles = useStyles();
  const channels = useSelector((state) => state.following.suggestChannel);
  return (
    <View styles={styles.container}>
      <List.Section>
        <List.Subheader>
          <Headline style={styles.headline}>Suggestion Channel</Headline>
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

export default React.memo(SuggestChannel);

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
