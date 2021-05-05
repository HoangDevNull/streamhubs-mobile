import React from 'react';
import { View, Image } from 'react-native';
import { Card, Text, Title } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import ChipCustom from './ChipCustom';

const CategoryBanner = ({ data }) => {
  const styles = useStyles();
  return (
    <Card elevation={0} style={styles.container}>
      <Card.Content style={styles.wrapper}>
        <View style={styles.leftWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: data?.banner,
            }}
          />
        </View>

        <View style={styles.rightWrapper}>
          <Title style={styles.fontBold}>{data?.name}</Title>
          <View style={styles.viewerWrapper}>
            <Text style={styles.fontBold}>{data?.follower} Followers</Text>
          </View>
          <Text style={styles.description} numberOfLines={4}>
            Apex Legends is a free-to-play Battle Royale game where legendary
            competitors battle for glory, fame, and fortune on the fringes of
            the Frontier.
            {data?.description}
          </Text>

          <View style={styles.tagWrapper}>
            {data?.tags?.map((item) => (
              <ChipCustom
                key={`item_${item?.id}`}
                title={item.name}
                color={item?.color}
              />
            ))}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default React.memo(CategoryBanner);

const useStyles = makeStyles((theme) => ({
  container: {
    marginVertical: 15,
    backgroundColor: theme.colors.backgroundColor,
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
  },
  description: {
    minHeight: 50,
  },
  viewerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    maxWidth: 230,
  },
  tagWrapper: {
    flexDirection: 'row',
    marginTop: 8,
  },
  image: {
    height: '100%',
    width: 120,
    padding: 16,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  fontBold: {
    fontFamily: 'Inter-Bold',
  },
}));
