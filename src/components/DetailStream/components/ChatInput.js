import React from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import { IconButton, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import Emote from './Emote';

const ChatInput = ({ theme }) => {
  const styles = useStyles();
  const user = useSelector((state) => state.user);
  const channel = useSelector((state) => state.detailStream);
  const socket = useSelector((state) => state.socket.socketInstance);
  const [message, setMessage] = React.useState('');
  const [openEmote, setOpenEmote] = React.useState(false);

  const _sendMessage = () => {
    if (!message) return;
    const payload = {
      id: Date.now(),
      username: user?.username,
      color: user?.userProfile?.color,
      message,
      endPoint: channel?.endPoint,
    };
    socket.emit('newMessage', payload);
    setMessage('');
    Keyboard.dismiss();
  };

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 10, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={[theme.colors.disabled, theme.colors.disabled]}
          style={styles.wrapInput}>
          <TextInput
            value={message}
            onChangeText={(text) => setMessage(text)}
            placeholderTextColor={theme.colors.placeholder}
            placeholder="Send a message"
            style={styles.input}
            onFocus={() => setOpenEmote(false)}
          />
          <IconButton
            icon={() => (
              <Ionicons
                name="happy-outline"
                color={openEmote ? theme.colors.primary : '#fff'}
                size={26}
              />
            )}
            color={theme.colors.primary}
            size={20}
            onPress={() => {
              Keyboard.dismiss();
              setOpenEmote(!openEmote);
            }}
          />
        </LinearGradient>
        <IconButton
          icon={() => <Feather name="send" color="#fff" size={26} />}
          color={theme.colors.primary}
          size={32}
          onPress={_sendMessage}
        />
      </View>
      <Emote open={openEmote} />
    </>
  );
};

export default withTheme(ChatInput);

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapInput: {
    flex: 1,
    borderRadius: 4,
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
