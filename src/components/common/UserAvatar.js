import React from 'react';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { Avatar, withTheme } from 'react-native-paper';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

const UserAvatar = ({ onPress, style, size = 24, theme }) => {
  const styles = useStyles();

  return (
    <View style={style}>
      <TouchableHighlight onPress={onPress}>
        <Avatar.Icon
          style={[styles.avatar, { borderRadius: size / 4 }]}
          size={size}
          icon={({ size: iconSize }) => {
            return (
              <Ionicons
                name="person-circle-outline"
                color={theme.colors.text}
                size={iconSize}
              />
            );
          }}
        />
      </TouchableHighlight>
    </View>
  );
};
const useStyles = makeStyles((theme) => ({
  avatar: {
    borderWidth: 2,
    borderColor: theme.colors.text,
  },
}));

export default withTheme(React.memo(UserAvatar));
