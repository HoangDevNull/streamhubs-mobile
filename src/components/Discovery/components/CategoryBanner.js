import React from 'react';
import { View, Image } from 'react-native';
import { Card, Text, Title } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import ChipCustom from '../../common/ChipCustom';

const CategoryBanner = ({ navigation }) => {
  const styles = useStyles();

  return (
    <Card elevation={0} style={styles.container}>
      <Card.Content style={styles.wrapper}>
        <View style={styles.leftWrapper}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://static-cdn.jtvnw.net/ttv-boxart/Apex%20Legends-244x292.jpg',
            }}
          />
        </View>

        <View style={styles.rightWrapper}>
          <Title style={styles.fontBold}>Apex Legend</Title>
          <Text numberOfLines={2}>
            Apex Legends is a free-to-play Battle Royale game where legendary
            competitors battle for glory, fame, and fortune on the fringes of
            the Frontier.
          </Text>
          <View style={styles.viewerWrapper}>
            <Text style={styles.fontBold}>29.3K Viewers</Text>
            <Text style={styles.fontBold}>1.6m Followers</Text>
          </View>

          <View style={styles.tagWrapper}>
            <ChipCustom title="Gaming" color="green400" />
            <ChipCustom title="Esport" color="pink400" />
            <ChipCustom title="MOBA" color="purple400" />
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
    backgroundColor: theme.colors.surface,
  },
  rightWrapper: {
    flex: 1,
    marginLeft: 15,
  },
  viewerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  tagWrapper: {
    flexDirection: 'row',
  },
  image: {
    height: 150,
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
