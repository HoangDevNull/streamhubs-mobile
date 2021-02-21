import React from 'react';
import { Image, View } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { Button, Text, withTheme } from 'react-native-paper';

const Prime = ({ theme }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={[styles.intro]}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Join Prime Streaming Today</Text>
          <Button
            style={styles.btnPrime}
            mode="contained"
            color={theme.colors.surface}>
            Try Premium
          </Button>
        </View>
        <Image
          style={styles.image}
          source={require('../../../assets/images/AR.png')}
        />
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
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: theme.colors.primary,
    paddingBottom: 15,
    overflow: 'hidden',
  },
  wrapper: {
    flex: 1,
    paddingLeft: 15,
  },
  text: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginVertical: 18,
    color: '#fff',
  },
  btnPrime: {
    width: 145,
  },

  image: {
    width: 145,
    height: 93,
    resizeMode: 'cover',
    position: 'absolute',
    bottom: -5,
    right: 15,
  },
}));
