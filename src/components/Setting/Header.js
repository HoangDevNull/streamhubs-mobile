import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { withTheme, Caption, Text, IconButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserAvatar from '../common/UserAvatar';

const Header = ({ theme }) => {
  const styles = useStyles();

  const { colors } = theme;
  return (
    <View style={styles.container}>
      <UserAvatar size={70} onPress={null} />
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
          <Ionicons color={color} name="videocam-outline" size={23} />
        )}
        style={styles.btnLive}
        color={colors.primary}
        size={28}
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
};

export default withTheme(Header);

const useStyles = makeStyles((theme) => ({
  container: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBold: {
    fontFamily: 'Inter-Bold',
    letterSpacing: 1.5,
  },
  btnLive: {
    backgroundColor: theme.colors.text,
  },
}));
