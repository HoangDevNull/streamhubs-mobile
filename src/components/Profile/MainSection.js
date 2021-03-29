import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { Text, Surface, Button, withTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Prime from './components/Prime';
import SurfaceButton from '../common/SurfaceButton';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
const MainSection = ({ theme }) => {
  const navigate = useNavigation();
  const styles = useStyles();
  const userProfile = useSelector((state) => state.user?.userProfile);
  return (
    <>
      <View style={styles.container}>
        <Surface style={[styles.surface, styles.wrapDes]}>
          <Ionicons
            size={28}
            color={theme.colors.text}
            name="ribbon-outline"
            style={styles.iconDes}
          />
          <Text style={styles.description}>
            {userProfile.description || `Let's have fun with Stream Hub`}
          </Text>
        </Surface>

        <Surface style={[styles.surface, styles.wrapOptions]}>
          <Button
            color={theme.colors.text}
            icon={({ size, color }) => (
              <Ionicons size={20} color={color} name="person-outline" />
            )}
            uppercase={false}
            onPress={() => navigate.navigate('CommingSoon')}>
            My Chanel
          </Button>

          <View style={styles.divider} />

          <Button
            color={theme.colors.text}
            icon={({ size, color }) => (
              <Ionicons size={20} color={color} name="build-outline" />
            )}
            uppercase={false}
            onPress={() => navigate.navigate('CommingSoon')}>
            Stream tool
          </Button>
        </Surface>

        <View style={styles.surface}>
          <Prime />
        </View>

        <View style={styles.mt10}>
          <Surface style={styles.wrappButtonSurface}>
            <SurfaceButton
              onPress={() => console.log('pressed')}
              icon="notifications-outline"
              title="Subcribed"
            />
          </Surface>

          <Surface style={styles.wrappButtonSurface}>
            <SurfaceButton
              onPress={() => console.log('pressed')}
              icon="barcode-outline"
              title="Drops"
            />
          </Surface>

          <Surface style={styles.wrappButtonSurface}>
            <SurfaceButton
              onPress={() => console.log('pressed')}
              icon="people-outline"
              title="Friends"
            />
          </Surface>

          <Surface style={styles.wrappButtonSurface}>
            <SurfaceButton
              onPress={() => console.log('pressed')}
              icon="eye-outline"
              title="Set online status"
            />
          </Surface>
        </View>
      </View>
    </>
  );
};

export default withTheme(React.memo(MainSection));

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
  },
  surface: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 10,
  },
  wrapDes: {
    paddingTop: 20,
    paddingBottom: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
  },
  iconDes: {
    position: 'absolute',
    top: -15,
    left: '50%',
  },
  description: {
    textAlign: 'center',
  },
  wrapOptions: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: theme.colors.disabled,
  },
  mt10: {
    marginTop: 10,
  },
  wrappButtonSurface: {
    flexDirection: 'row',
    borderRadius: 12,
    marginVertical: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));
