import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, withTheme, IconButton, Headline } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useRoute, useNavigation } from '@react-navigation/native';

const renderTitle = (title) => (
  <Headline style={styles.title}>
    {title.split('').map((char, i) => {
      if (char === 'o' || char === 'a') {
        return (
          <Headline
            key={i}
            style={[
              styles.title,
              i % 2 === 0 ? styles.letterPurple : styles.letterPink,
            ]}>
            {char}
          </Headline>
        );
      } else {
        return char;
      }
    })}
  </Headline>
);

const Left = ({ theme, title }) => {
  const route = useRoute();
  const navigation = useNavigation();

  const _handleBack = () => console.log('Back');
  return (
    <Appbar.Content
      title={
        title ? (
          renderTitle(title)
        ) : (
          <IconButton
            icon={() => (
              <Ionicons
                name="chevron-back"
                size={24}
                color={theme.colors.text}
              />
            )}
            size={24}
            onPress={_handleBack}
          />
        )
      }
    />
  );
};

export default withTheme(Left);

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter-Black',
    letterSpacing: 1.4,
  },
  letterPurple: {
    color: '#8734FE',
  },
  letterPink: {
    color: '#FF4994',
  },
});
