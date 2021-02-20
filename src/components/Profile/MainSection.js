import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { Subheading, Surface, Button, withTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyChanel from './components/MyChanel';
import Prime from './components/Prime';

const MainSection = ({ theme }) => {
  const styles = useStyles();
  return (
    <>
      <View style={styles.container}>
        <Surface style={[styles.surface, styles.wrapDes]}>
          <Ionicons size={23} color={theme.colors.text} name="ribbon-outline" />
          <Subheading> Let's have fun with Streamer Hubs</Subheading>
        </Surface>

        <Surface style={[styles.surface, styles.wrapOptions]}>
          <Button
            color={theme.colors.text}
            icon={({ size, color }) => (
              <Ionicons size={size} color={color} name="person-outline" />
            )}
            uppercase={false}>
            My Chanel
          </Button>

          <View style={styles.divider} />

          <Button
            color={theme.colors.text}
            icon={({ size, color }) => (
              <Ionicons size={size} color={color} name="build-outline" />
            )}
            uppercase={false}>
            Stream tool
          </Button>
        </Surface>

        <View style={styles.surface}>
          <Prime />
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
    marginVertical: 15,
  },
  wrapDes: {
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  wrapOptions: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: theme.colors.disabled,
  },
}));
