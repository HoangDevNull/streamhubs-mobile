import React from 'react';
import { View, Platform } from 'react-native';
import { Text, Card, withTheme, Badge } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Slider from '../../common/Slider';
import { useScreenSize } from '../../../hooks/useScreenSize';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const CategorySlider = ({ theme }) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { width, height, isPortrait } = useScreenSize();
  const categories = useSelector((state) => state.following?.categories);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <Card
        elevation={2}
        onPress={() => navigation.navigate('DetailCategory', item)}
        style={styles.card}>
        <Card.Cover
          style={styles.imageContainer}
          source={{ uri: item.banner }}
        />
        <Card.Content style={styles.cardContent}>
          <View style={styles.viewerWrapper}>
            <Badge size={8} style={styles.dot} />
            <Text style={styles.textContent}>{`${item.follower} K`} </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const sliderWidth = isPortrait ? width : height;

  return (
    <View styles={styles.container}>
      <Slider
        sliderWidth={sliderWidth - 60}
        itemWidth={sliderWidth}
        data={categories?.results || []}
        type="tinder"
        renderItem={renderItem}
        hidePagination
      />
    </View>
  );
};

export default withTheme(CategorySlider);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    alignSelf: 'center',
    width: '100%',
    borderRadius: 15,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    maxWidth: 550,
  },
  cardContent: {
    position: 'absolute',
    bottom: -5,
    left: 0,
  },
  imageContainer: {
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    borderRadius: 15,
  },
  viewerWrapper: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: theme.colors.backdrop,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  dot: {
    alignSelf: 'center',
    marginRight: 10,
  },
  textContent: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
}));
