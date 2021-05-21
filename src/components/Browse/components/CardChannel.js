import React from 'react';
import { View, Image } from 'react-native';
import {
  Card,
  Paragraph,
  Subheading,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import LiveBadge from '../../common/LiveBadge';
import ViewerBadge from '../../common/ViewerBadge';
import UserAvatar from '../../common/UserAvatar';
import { useNavigation } from '@react-navigation/native';

const CardCategory = ({ dataItem }) => {
  const styles = useStyles();
  const theme = useTheme();
  const { banner, owner, follower, viewers, description } = dataItem;
  const navigation = useNavigation();

  return (
    <TouchableRipple
      onPress={() => navigation.navigate('DetailStream', dataItem)}
      rippleColor={theme.colors.ripple}>
      <Card elevation={0} style={styles.container}>
        <Card.Content style={styles.wrapper}>
          <View>
            <Image
              style={styles.image}
              source={{
                uri: banner,
              }}
            />
            <LiveBadge position="top" />
            <ViewerBadge backdrop position="bottom" count="8,222" />
          </View>
        </Card.Content>
        <Card.Actions style={styles.cardAction}>
          <UserAvatar size={40} src={owner.userProfile.avatar} />
          <View style={styles.textWrapper}>
            <Subheading style={styles.fontBold}>
              {owner.username || '#Noname'}
            </Subheading>
            <Paragraph numberOfLines={1}>{description}</Paragraph>
          </View>
        </Card.Actions>
      </Card>
    </TouchableRipple>
  );
};

export default React.memo(CardCategory);

const useStyles = makeStyles((theme) => ({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    // backgroundColor: theme.colors.background,
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
}));
