import React from 'react';
import { View, ImageBackground } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { withTheme, Caption, Text, IconButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserAvatar from '../common/UserAvatar';
import { useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { AVATAR_URL } from '../../config';

const Header = ({ theme }) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { avatar, banner } = useSelector((state) => state.user?.userProfile);
  const { colors } = theme;
  return (
    <ImageBackground
      source={{
        uri: banner || null,
      }}
      imageStyle={styles.imageStyle}
      style={styles.container}>
      <UserAvatar
        size={70}
        src={avatar ? AVATAR_URL + avatar : null}
        onPress={null}
      />
      <View>
        <Text style={styles.textBold}>4.6 K</Text>
        <Caption>Followers</Caption>
      </View>
      <View>
        <Text style={styles.textBold}>62</Text>
        <Caption>Following</Caption>
      </View>
      <IconButton
        icon={({ color }) => (
          <Ionicons color={'#fff'} name="videocam-outline" size={23} />
        )}
        style={styles.btnLive}
        color={colors.primary}
        size={28}
        onPress={() => navigation.navigate('LiveStream')}
      />
    </ImageBackground>
  );
};

export default withTheme(Header);

const useStyles = makeStyles((theme) => ({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 10,
    opacity: 0.6,
    resizeMode: 'cover',
  },
  textBold: {
    fontFamily: 'Inter-Bold',
    letterSpacing: 1.5,
  },
  btnLive: {
    backgroundColor: theme.colors.primary,
  },
}));
