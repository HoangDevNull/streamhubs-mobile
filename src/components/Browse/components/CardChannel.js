import React from 'react';
import { View, Image } from 'react-native';
import { Card, Paragraph, Subheading, Text } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import LiveBadge from '../../common/LiveBadge';
import ViewerBadge from '../../common/ViewerBadge';
import UserAvatar from '../../common/UserAvatar';

const CardCategory = ({ navigation }) => {
  const styles = useStyles();

  return (
    <Card
      onPress={() => console.log('prest')}
      elevation={0}
      style={styles.container}>
      <Card.Content style={styles.wrapper}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_csgo-440x248.jpg',
            }}
          />
          <LiveBadge position="top" />
          <ViewerBadge backdrop position="bottom" count="8,222" />
        </View>
      </Card.Content>
      <Card.Actions style={styles.cardAction}>
        <UserAvatar size={40} />
        <View style={styles.textWrapper}>
          <Subheading style={styles.fontBold}>Ninja</Subheading>

          <Paragraph numberOfLines={1}>Follow us on social now !!!</Paragraph>
        </View>
      </Card.Actions>
    </Card>
  );
};

export default React.memo(CardCategory);

const useStyles = makeStyles((theme) => ({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.background,
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
