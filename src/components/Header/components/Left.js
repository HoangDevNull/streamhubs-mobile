import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, withTheme, IconButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';
import UserAvatar from '../../common/UserAvatar';
import { useSelector } from 'react-redux';

const Left = ({ theme }) => {
  const navigation = useNavigation();
  const { avatar } = useSelector((state) => state.user?.userProfile);
  const _handleBack = () => navigation.goBack();
  const _handleGoToSetting = () => navigation.navigate('Profile');

  const canGoBack = navigation.canGoBack();

  return (
    <Appbar.Content
      style={[styles.root, canGoBack && styles.stickToLeft]}
      title={
        canGoBack ? (
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
          <UserAvatar
            src={avatar || null}
            size={30}
            onPress={_handleGoToSetting}
          />
        )
      }
    />
  );
};

export default withTheme(Left);

const styles = StyleSheet.create({
  root: {
    flex: 0,
  },
  stickToLeft: {
    marginLeft: -10,
  },
});
