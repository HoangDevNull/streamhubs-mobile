import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Dimensions, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
const Slider = ({
  theme,
  data,
  renderItem,
  type = 'default',
  itemWidth,
  sliderWidth,
  sliderHeight,
  hidePagination = false,
}) => {
  const styles = useStyles();
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(1);
  const carouselRef = useRef(null);

  return (
    <View style={styles.container}>
      <Carousel
        layout={type}
        ref={carouselRef}
        sliderWidth={sliderWidth}
        sliderHeight={sliderHeight}
        itemWidth={itemWidth}
        data={data}
        renderItem={renderItem}
        // firstItem={data.length - 1 || 1}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.3}
        enableMomentum={true}
        hasParallaxImages
        loop={true}
        // loopClonesPerSide={2}
        // autoplay={true}
        // autoplayDelay={3000}
        // autoplayInterval={3000}
        onSnapToItem={(index) => setSlider1ActiveSlide(index)}
        activeAnimationType={'spring'}
        activeAnimationOptions={{
          friction: 4,
          tension: 40,
        }}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
      />

      {!hidePagination && (
        <Pagination
          dotsLength={data.length || 0}
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
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'auto',
  },
  paginationContainer: {
    paddingVertical: 18,
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

Slider.propTypes = {
  sliderWidth: PropTypes.number.isRequired,
  sliderHeight: PropTypes.number,
  itemWidth: PropTypes.number.isRequired,
  data: PropTypes.array,
  renderItem: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  type: PropTypes.oneOf(['default', 'stack', 'tinder']),
  hidePagination: PropTypes.bool,
};
export default withTheme(React.memo(Slider));
