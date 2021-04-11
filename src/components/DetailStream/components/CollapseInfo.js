import React from 'react';
import { View } from 'react-native';
import { Subheading, Text, Button, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useSelector } from 'react-redux';

import Animated, { Easing } from 'react-native-reanimated';

import { authRequest, subStatusURL } from '../../../services';
import { AVATAR_URL } from '../../../config';

import ChipCustom from '../../common/ChipCustom';
import UserAvatar from '../../common/UserAvatar';

// Animated val
const { Value } = Animated;
const position = new Value(1);

const CollapseInfo = ({ isPortrait, theme }) => {
  const styles = useStyles();
  const { focus, showChatRoom } = useSelector((state) => state.player);
  const channel = useSelector((state) => state.detailStream);
  const access_token = useSelector((state) => state.user?.access_token);
  const [subscribe, setSubcribed] = React.useState(null);

  // Get subcribe status
  React.useEffect(() => {
    if (access_token && channel?.id) {
      authRequest(`${subStatusURL}/${channel.id}`, 'GET', access_token)
        .then(({ data }) => {
          console.log({ data });
          setSubcribed(data);
        })
        .catch((err) => console.log(err));
    }
  }, [access_token, channel]);

  React.useEffect(() => {
    if (focus) {
      // show
      Animated.timing(position, {
        duration: 50,
        toValue: 1,
        easing: Easing.inOut(Easing.ease),
      }).start();
    } else {
      // hide
      Animated.timing(position, {
        duration: 10,
        toValue: 0,
        easing: Easing.inOut(Easing.ease),
      }).start();
    }
  }, [focus]);

  const height = Animated.interpolate(position, {
    inputRange: [0, 1],
    outputRange: [0, 125],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  const opacity = Animated.interpolate(position, {
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  const shouldResize = isPortrait === false && showChatRoom;
  const avatar = channel?.owner?.userProfile?.avatar;
  return (
    <>
      <Animated.View
        style={[
          styles.container,
          !isPortrait && styles.containerLandscape,
          shouldResize && styles.showChatRoom,
          { height: height, opacity },
        ]}>
        <View style={styles.wrapper}>
          <UserAvatar src={avatar ? AVATAR_URL + avatar : null} size={32} />
          <View style={styles.titleWrapper}>
            <Subheading style={styles.fontBold}>
              {channel?.owner?.username}
            </Subheading>
            <Text numberOfLines={2}>{channel?.description}</Text>
          </View>
          {subscribe !== null && (
            <View style={styles.subcribeButton}>
              <Button
                icon={() => (
                  <Ionicons
                    name={subscribe ? 'heart' : 'heart-outline'}
                    color={subscribe ? theme.colors.primary : '#fff'}
                    size={18}
                  />
                )}
                labelStyle={styles.subcribeButtonText}
                uppercase={false}
                compact
                mode={subscribe ? 'outlined' : 'contained'}>
                {subscribe ? 'Unsubscribe' : 'Subscribe'}
              </Button>
            </View>
          )}
        </View>

        <View style={styles.wrapTag}>
          <FlatList
            data={channel?.category?.tags}
            keyExtractor={({ id }) => String(id)}
            renderItem={({ item: { color, name } }) => (
              <ChipCustom style={styles.chip} color={color} title={name} />
            )}
            horizontal={true}
          />
        </View>
      </Animated.View>
    </>
  );
};

export default React.memo(withTheme(CollapseInfo));

const useStyles = makeStyles((theme) => ({
  fontBold: {
    fontFamily: 'Inter-Bold',
  },
  showChatRoom: {
    width: '75%',
  },
  hideChatRoom: {
    width: '100%',
  },
  containerLandscape: {
    position: 'absolute',
    bottom: 0,
  },
  container: {
    paddingHorizontal: 8,
    width: '100%',
    backgroundColor: theme.colors.background,
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: 15,
  },
  titleWrapper: {
    flex: 1,
    marginLeft: 10,
    marginTop: -6,
  },
  subcribeButton: {
    marginLeft: 5,
  },
  subcribeButtonText: {
    fontSize: 12,
    marginVertical: 6,
    marginHorizontal: 12,
  },
  wrapTag: {
    marginTop: 15,
    paddingLeft: 42,
  },
}));
