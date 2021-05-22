import React from 'react';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import { View, Image } from 'react-native';
import { Paragraph, Title, withTheme } from 'react-native-paper';

const NoResultsFound = ({ theme }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../assets/images/not_found.png')}
      />

      <Title style={styles.center}>No Result Found</Title>
      <Paragraph style={styles.center}>
        We cannot find the item you are searching for, maybe a little spelling
        mistake?
      </Paragraph>
    </View>
  );
};

export default withTheme(React.memo(NoResultsFound));

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
  },
  center: {
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    alignSelf: 'center',
  },
}));
