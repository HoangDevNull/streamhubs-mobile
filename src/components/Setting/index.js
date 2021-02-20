import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import Header from './Header';
import MainSection from './MainSection';

const Setting = ({ navigation, theme }) => {
  const styles = useStyles();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.wrapHeadder}>
            <Header />
          </View>

          <View style={styles.mainSection}>
            <MainSection />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 12,
  },
  wrapHeadder: {},
  mainSection: {
    marginTop: 10,
    flex: 1,
    // backgroundColor: 'red',
  },
}));

export default withTheme(Setting);
