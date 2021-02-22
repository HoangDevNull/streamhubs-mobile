import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { Subheading, Surface, Button, withTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyChanel from './components/MyChanel';
import Prime from './components/Prime';
import SurfaceButton from '../common/SurfaceButton';

const MainSection = ({ theme }) => {
  const styles = useStyles();
  return (
    <>
      <View style={styles.container}>
        <Surface style={[styles.surface, styles.wrapDes]}>
          <Ionicons size={22} color={theme.colors.text} name="ribbon-outline" />
          <Subheading> Let's have fun with Streamer Hubs</Subheading>
        </Surface>

        <Surface style={[styles.surface, styles.wrapOptions]}>
          <Button
            color={theme.colors.text}
            icon={({ size, color }) => (
              <Ionicons size={20} color={color} name="person-outline" />
            )}
            uppercase={false}>
            My Chanel
          </Button>

          <View style={styles.divider} />

          <Button
            color={theme.colors.text}
            icon={({ size, color }) => (
              <Ionicons size={20} color={color} name="build-outline" />
            )}
            uppercase={false}>
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
    paddingVertical: 14,
    paddingHorizontal: 18,
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
