import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { openUserSetting } from '../../../redux/actions/gui';
const Right = ({ theme: { colors } }) => {
  const { name } = useRoute();
  const dispatch = useDispatch();

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
  const _openUserSetting = () => {
    dispatch(openUserSetting(true));
  };

  const { text: mainColor } = colors;

  if (name.includes('CommingSoon')) {
    return false;
  }
  if (name.includes('Profile')) {
    return (
      <Appbar.Action
        icon={({ size }) => (
          <Ionicons name="settings-outline" size={size} color={mainColor} />
        )}
        onPress={_openUserSetting}
      />
    );
  }
  return (
    <>
      <Appbar.Action
        icon={({ size }) => (
          <Ionicons name="search-outline" size={size} color={mainColor} />
        )}
        onPress={_handleSearch}
      />
      <Appbar.Action
        icon={({ size }) => (
          <Ionicons name="mail-unread-outline" size={size} color={mainColor} />
        )}
        onPress={_handleMore}
      />
    </>
  );
};

export default withTheme(React.memo(Right));

const styles = StyleSheet.create({});
