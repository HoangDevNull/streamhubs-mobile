import React from 'react';
import { IconButton, withTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const GoBackButton = ({ navigation, style, theme }) => {
  const _handleBack = () => {
    console.log('back');
    navigation.goBack();
  };
  return (
    <IconButton
      style={style}
      icon={() => (
        <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
      )}
      size={24}
      onPress={_handleBack}
    />
  );
};

export default withTheme(GoBackButton);
