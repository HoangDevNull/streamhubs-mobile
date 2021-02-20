import React, { useRef, useState } from 'react';
import Carousel, {
  Pagination,
  ParallaxImage,
} from 'react-native-snap-carousel';
import { View, Dimensions, StyleSheet, Platform } from 'react-native';
import { Button, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
];
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * screenWidth) / 100;
  return Math.round(value);
}

const slideHeight = screenHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = screenWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const VideoSlide = ({ theme }) => {
  const styles = useStyles();
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(1);
  const carouselRef = useRef(null);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.illustration }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        // layout={'tinder'}
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={ENTRIES1}
        renderItem={renderItem}
        firstItem={2}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.3}
        enableMomentum={true}
        hasParallaxImages
        loop={true}
        loopClonesPerSide={2}
        autoplay={true}
        autoplayDelay={3000}
        autoplayInterval={3000}
        onSnapToItem={(index) => setSlider1ActiveSlide(index)}
        activeAnimationType={'spring'}
        activeAnimationOptions={{
          friction: 4,
          tension: 40,
        }}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
      />

      <Pagination
        dotsLength={ENTRIES1.length}
        activeDotIndex={slider1ActiveSlide}
        containerStyle={styles.paginationContainer}
        dotColor={theme.colors.text}
        dotStyle={styles.paginationDot}
        inactiveDotColor={theme.colors.disabled}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        carouselRef={carouselRef}
        tappableDots={!!carouselRef}
      />
    </View>
  );
};

export default withTheme(VideoSlide);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: 200,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingBottom: 10, // for custom animation
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
}));
