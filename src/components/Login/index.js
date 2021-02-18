import React from 'react';
import { Image, SafeAreaView, View, ScrollView } from 'react-native';
import { Button, Subheading, TextInput, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import GoBackButton from '../common/GoBackButton';

const Login = ({ navigation, theme }) => {
  const styles = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [credential, setCredentital] = React.useState({
    email: '',
    password: '',
  });
  const { email, password } = credential;

  const _pressEyeButton = () => setShowPassword(!showPassword);
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
            autoFocus
            dense
            mode="outlined"
            left={<TextInput.Icon name="email-outline" />}
            value={email}
            onChangeText={(text) =>
              setCredentital({ ...credential, email: text })
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

          <Button
            color={theme.colors.text}
            style={styles.btnForgot}
            uppercase={false}>
            Forgot Password?
          </Button>
          <Button mode="contained" onPress={() => console.log('pressed')}>
            Sign in
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
  btnForgot: {
    marginVertical: 10,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 13,
  },
}));

export default withTheme(Login);
