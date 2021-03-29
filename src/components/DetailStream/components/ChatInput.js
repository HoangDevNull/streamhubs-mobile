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
      start={{ x: 10, y: 0 }}
      end={{ x: 0, y: 0 }}
      colors={[theme.colors.disabled, theme.colors.disabled]}
      style={styles.container}>
      <TextInput
        placeholderTextColor={theme.colors.placeholder}
        placeholder="Send a message"
        style={styles.input}
      />
      <IconButton
        icon={() => <Ionicons name="send-outline" color="#fff" size={22} />}
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
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text,
  },
}));
