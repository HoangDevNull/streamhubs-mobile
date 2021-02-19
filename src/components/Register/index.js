import React from 'react';
import { Image, SafeAreaView, View, ScrollView } from 'react-native';
import {
  Button,
  HelperText,
  Subheading,
  TextInput,
  withTheme,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import GoBackButton from '../common/GoBackButton';
import { format } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Register = ({ navigation, theme }) => {
  const styles = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [credential, setCredentital] = React.useState({
    email: '',
    username: '',
    password: '',
    dateOfBirth: new Date(),
  });
  const [errors, setErrors] = React.useState({
    email: '',
    username: '',
    password: '',
  });

  const [visible, setVisible] = React.useState(false);

  const _pressEyeButton = React.useCallback(
    () => setShowPassword(!showPassword),
    [showPassword],
  );
  const emailValidate = (email) => {
    // eslint-disable-next-line no-useless-escape
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(String(email).toLowerCase());
  };

  const onInputChange = React.useCallback(
    (name, value) => {
      const resetErrorFields = () => {
        if (errors[name] !== '') {
          setErrors({ ...errors, [name]: '' });
        }
      };
      let isValid = true;
      if (value !== '') {
        if (name === 'email') {
          if (!emailValidate(value)) {
            setErrors({ ...errors, [name]: 'Invalid email address' });
            isValid = false;
          } else {
            resetErrorFields();
          }
        }
        if (name === 'password') {
          if (value.length < 8) {
            setErrors({
              ...errors,
              [name]: 'Password length must greater than 8',
            });
            isValid = false;
          } else {
            resetErrorFields();
          }
        }
      }

      setCredentital({ ...credential, [name]: value });
      if (isValid) {
        resetErrorFields();
      }
    },
    [credential, errors],
  );

  const onDateChange = React.useCallback(
    (e, date) => {
      setVisible(false);
      setCredentital({ ...credential, dateOfBirth: date });
    },
    [credential],
  );

  const _SignUp = () => {
    console.log({ credential });
  };

  const { email, username, password, dateOfBirth } = credential;
  const {
    email: emailError,
    username: usernameError,
    password: passwordError,
  } = errors;

  const isValidateAllField =
    emailError ||
    passwordError ||
    usernameError ||
    email === '' ||
    password === '' ||
    username === '';

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
            onChangeText={(text) => onInputChange('email', text)}
            style={styles.textInput}
            error={emailError}
          />
          <HelperText type="error" visible={emailError}>
            {emailError}
          </HelperText>

          <Subheading style={styles.label}> Name: </Subheading>
          <TextInput
            dense
            mode="outlined"
            left={<TextInput.Icon name="account-outline" />}
            value={username}
            onChangeText={(text) => onInputChange('username', text)}
            style={styles.textInput}
            error={usernameError}
          />
          <HelperText type="error" visible={usernameError}>
            {usernameError}
          </HelperText>

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
            onChangeText={(text) => onInputChange('password', text)}
            style={styles.textInput}
            secureTextEntry={!showPassword}
            error={passwordError}
          />
          <HelperText type="error" visible={passwordError}>
            {passwordError}
          </HelperText>

          <Subheading style={styles.label}> Birth date: </Subheading>
          {visible && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateOfBirth}
              onChange={onDateChange}
            />
          )}
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
            onPress={() => setVisible(true)}>
            {format(dateOfBirth, 'P').toString()}
          </Button>

          <Button
            disabled={isValidateAllField}
            style={styles.btnSignUp}
            mode="contained"
            onPress={_SignUp}>
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
    marginHorizontal: 5,
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

export default withTheme(Register);
