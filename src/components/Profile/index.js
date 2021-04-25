import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { Portal, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';

import Header from './Header';
import MainSection from './MainSection';
import UserSetting from './components/UserSetting';

import { useSelector, useDispatch } from 'react-redux';

import { authRequest, userURL } from '../../services';
import { updateUserProfile } from '../../redux/actions/user';

const Profile = ({ navigation, theme }) => {
  const access_token = useSelector((state) => state.user?.access_token);
  const dispatch = useDispatch();
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await authRequest(userURL, 'GET', access_token);
        dispatch(updateUserProfile({ ...data }));
      } catch (err) {
        console.log({ err });
      }
    })();
  }, [dispatch, access_token]);
  const styles = useStyles();
  return (
    <Portal.Host>
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
      <UserSetting />
    </Portal.Host>
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

export default withTheme(Profile);
