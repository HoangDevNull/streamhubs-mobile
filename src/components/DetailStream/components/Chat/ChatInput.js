import React from 'react';
import { View, TextInput } from 'react-native';
import { IconButton, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const ChatInput = ({ theme }) => {
  const styles = useStyles();

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[theme.colors.contrast, '#F7F7F8']}
      style={styles.container}>
      <TextInput placeholder="Send a message" style={styles.input} />

      <View style={styles.divider} />

      <IconButton
        icon={() => <Ionicons name="happy-outline" color="#f50057" size={23} />}
        color={theme.colors.primary}
        size={25}
        onPress={() => console.log('Pressed')}
      />
    </LinearGradient>
  );
};

export default withTheme(ChatInput);

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    flexDirection: 'row',
  },
  divider: {
    alignSelf: 'center',
    height: '80%',
    width: 2,
    backgroundColor: '#E3E3E4',
  },
  input: {
    width: '85%',
    paddingHorizontal: 15,
    fontFamily: 'Inter-SemiBold',
  },
}));
