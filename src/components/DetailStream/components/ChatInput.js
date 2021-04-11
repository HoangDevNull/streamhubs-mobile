import React from 'react';
import { View, TextInput } from 'react-native';
import { IconButton, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const ChatInput = ({ theme }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 10, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={[theme.colors.disabled, theme.colors.disabled]}
        style={styles.wrapInput}>
        <TextInput
          placeholderTextColor={theme.colors.placeholder}
          placeholder="Send a message"
          style={styles.input}
        />
        <IconButton
          icon={() => <Ionicons name="happy-outline" color="#fff" size={26} />}
          color={theme.colors.primary}
          size={20}
          onPress={() => console.log('Pressed')}
        />
      </LinearGradient>
      <IconButton
        icon={() => <Feather name="send" color="#fff" size={26} />}
        color={theme.colors.primary}
        size={32}
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
};

export default withTheme(ChatInput);

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapInput: {
    flex: 1,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text,
    height: 42,
  },
}));
