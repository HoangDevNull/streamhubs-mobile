import React from 'react';
import { Image, SafeAreaView, View, ScrollView } from 'react-native';
import { Button, Subheading, TextInput, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import GoBackButton from '../common/GoBackButton';
import { format } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = ({ navigation, theme }) => {
  const styles = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [credential, setCredentital] = React.useState({
    email: '',
    username: '',
    password: '',
    dateOfBirth: new Date(),
  });

  const _pressEyeButton = React.useCallback(
    () => setShowPassword(!showPassword),
    [showPassword],
  );
  const { email, username, password, dateOfBirth } = credential;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <GoBackButton style={styles.backButton} navigation={navigation} />
        <View style={styles.topSection}>
          <Image
            source={require('../../assets/images/logo_horizontal.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.mainSection}>
          <Subheading style={styles.label}> Email: </Subheading>
          <TextInput
            dense
            mode="outlined"
            left={<TextInput.Icon name="email-outline" />}
            value={email}
            onChangeText={(text) =>
              setCredentital({ ...credential, email: text })
            }
            style={styles.textInput}
          />

          <Subheading style={styles.label}> Name: </Subheading>
          <TextInput
            dense
            mode="outlined"
            left={<TextInput.Icon name="account-outline" />}
            value={username}
            onChangeText={(text) =>
              setCredentital({ ...credential, username: text })
            }
            style={styles.textInput}
          />

          <Subheading style={styles.label}> Password: </Subheading>
          <TextInput
            dense
            mode="outlined"
            left={<TextInput.Icon name="lock-outline" />}
            right={
              <TextInput.Icon
                name={!showPassword ? 'eye' : 'eye-off'}
                onPress={_pressEyeButton}
              />
            }
            value={password}
            onChangeText={(text) =>
              setCredentital({ ...credential, password: text })
            }
            style={styles.textInput}
            secureTextEntry={showPassword}
          />

          <Subheading style={styles.label}> Birth date: </Subheading>
          <Button
            color="#fff"
            uppercase={false}
            mode="outlined"
            icon={() => (
              <Ionicons
                name="calendar-outline"
                size={20}
                color={theme.colors.text}
              />
            )}
            style={styles.datePicker}
            contentStyle={styles.dateContent}
            onPress={() => console.log('press')}>
            {format(dateOfBirth, 'P').toString()}
          </Button>

          <Button
            style={styles.btnSignUp}
            mode="contained"
            onPress={() => console.log('pressed')}>
            Sign up
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
  },
  mainSection: {
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 76.03,
    resizeMode: 'contain',
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    marginLeft: -5,
  },
  textInput: {
    backgroundColor: theme.colors.surface,
  },
  btnSignUp: {
    marginTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 13,
  },
  datePicker: {
    borderColor: theme.colors.placeholder,
    borderWidth: 1,
  },
  dateContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
}));

export default withTheme(Login);
