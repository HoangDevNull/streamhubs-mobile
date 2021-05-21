import React from 'react';
import { View, Image } from 'react-native';
import {
  TouchableRipple,
  Card,
  Paragraph,
  Subheading,
  useTheme,
} from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import ChipCustom from '../../common/ChipCustom';
import { useNavigation } from '@react-navigation/native';

const CardCategory = ({ dataItem }) => {
  const styles = useStyles();
  const theme = useTheme();
  const navigation = useNavigation();
  const { banner, name, follower, tags } = dataItem;

  return (
    <TouchableRipple
      onPress={() => navigation.navigate('DetailStream', dataItem)}
      rippleColor={theme.colors.ripple}>
      <Card elevation={0} style={styles.container}>
        <Card.Content style={styles.wrapper}>
          <View style={styles.leftWrapper}>
            <Image
              style={styles.image}
              source={{
                uri: banner,
              }}
            />
          </View>

          <View style={styles.rightWrapper}>
            <Subheading style={styles.fontBold}>{name}</Subheading>
            <View style={styles.viewerWrapper}>
              <Paragraph style={styles.fontBold}>NaN Viewers</Paragraph>
              <Paragraph style={styles.fontBold}>
                {follower} Followers
              </Paragraph>
            </View>

            <View style={styles.tagWrapper}>
              {tags &&
                tags.map((tag) => (
                  <ChipCustom key={tag.id} title={tag.name} color={tag.color} />
                ))}
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );
};

export default React.memo(CardCategory);

const useStyles = makeStyles((theme) => ({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    // backgroundColor: theme.colors.backgroundColor,
    backgroundColor: 'transparent',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
  },
  leftWrapper: {
    backgroundColor: theme.colors.backgroundColor,
  },
  rightWrapper: {
    flex: 1,
    marginLeft: 15,
    alignSelf: 'flex-start',
  },
  viewerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
    marginBottom: 15,
    maxWidth: 230,
  },
  tagWrapper: {
    flexDirection: 'row',
  },
  image: {
    height: 110,
    width: 90,
    padding: 16,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  fontBold: {
    fontFamily: 'Inter-Bold',
  },
}));
