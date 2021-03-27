import React from 'react';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { Avatar, withTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

const UserAvatar = ({ onPress, style, size = 24, src }) => {
  const styles = useStyles();

  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress}>
        {src ? (
          <Avatar.Image
            style={[styles.avatar]}
            size={size}
            source={{
              uri: src,
            }}
          />
        ) : (
          <Avatar.Icon
            style={[styles.avatar]}
            size={size}
            icon={({ size: iconSize }) => {
              return (
                <Ionicons
                  name="person-circle-outline"
                  color={'#fff'}
                  size={iconSize}
                />
              );
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
const useStyles = makeStyles((theme) => ({
  avatar: {
    // borderWidth: 2,
    borderColor: theme.colors.contrast,
  },
}));

export default withTheme(React.memo(UserAvatar));
