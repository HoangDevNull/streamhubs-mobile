import * as React from 'react';
import { Appbar, withTheme, IconButton, Avatar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { useNavigation } from '@react-navigation/native';

const Left = ({ theme }) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const _handleBack = () => navigation.goBack();

  return (
    <Appbar.Content
      title={
        navigation.canGoBack() ? (
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
        ) : (
          <Avatar.Icon
            style={styles.avatar}
            size={30}
            icon={({ color, size }) => {
              return (
                <Ionicons name="person-outline" color={color} size={size} />
              );
            }}
          />
        )
      }
    />
  );
};

export default withTheme(Left);

const useStyles = makeStyles((theme) => ({
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
  avatar: {
    borderWidth: 2,
    borderColor: theme.colors.text,
  },
}));
