import React from 'react';
import { View, Image } from 'react-native';
import { withTheme, Text, Button } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import Ionicons from 'react-native-vector-icons/Ionicons';

const CommingSoon = ({ navigation, theme }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/comming_soon.png')}
      />
      <View style={styles.wrapText}>
        <Text style={styles.bigText}>Comming Soon</Text>
        <Text style={styles.content}>
          We are currently working on this feature. Thank's for using our app.
        </Text>

        <Button
          icon={({ color, size }) => (
            <Ionicons
              name="return-down-back-outline"
              color={color}
              size={size}
            />
          )}
          mode="contained"
          onPress={() => navigation.goBack()}>
          Go Back
        </Button>
      </View>
    </View>
  );
};

export default withTheme(CommingSoon);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
  },
  wrapText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  bigText: {
    fontSize: 35,
    fontFamily: 'Inter-Black',
  },
  content: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
}));
