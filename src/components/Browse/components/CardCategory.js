import React from 'react';
import { View, Image } from 'react-native';
import {
  Caption,
  Card,
  Paragraph,
  Subheading,
  Text,
  Title,
} from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import ChipCustom from '../../common/ChipCustom';

const CardCategory = ({ navigation }) => {
  const styles = useStyles();

  return (
    <Card
      onPress={() => console.log('prest')}
      elevation={0}
      style={styles.container}>
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
          <Subheading style={styles.fontBold}>Apex Legend</Subheading>
          <View style={styles.viewerWrapper}>
            <Paragraph style={styles.fontBold}>29.3K Viewers</Paragraph>
            <Paragraph style={styles.fontBold}>1.6m Followers</Paragraph>
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

export default React.memo(CardCategory);

const useStyles = makeStyles((theme) => ({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
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
