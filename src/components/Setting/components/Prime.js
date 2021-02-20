import React from 'react';
import { Image, View } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { Button, Text, withTheme } from 'react-native-paper';

const Prime = ({ theme }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={[styles.intro]}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/game_day.png')}
        />
        <Text style={styles.text}>Join Prime Streaming Today</Text>
        <Button mode="contained" color={theme.colors.surface}>
          Try Premium
        </Button>
      </View>
    </View>
  );
};

export default withTheme(React.memo(Prime));

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
  },
  intro: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingBottom: 20,
  },
  text: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginVertical: 18,
  },
  image: {
    width: 296,
    height: 193,
    resizeMode: 'contain',
  },
}));
