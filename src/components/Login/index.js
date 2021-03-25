import React from 'react';
import { Image, SafeAreaView, View, ScrollView } from 'react-native';
import {
  Button,
  Subheading,
  TextInput,
  Caption,
  withTheme,
  Text,
} from 'react-native-paper';

import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { saveLoginInfo } from '../../redux/actions/user';
import GoBackButton from '../common/GoBackButton';
import { loginUrl, request } from '../../services';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6).required('Password is required'),
});

const Login = ({ navigation, theme }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const _submit = async (payload) => {
    setLoading(true);
    try {
      const { data } = await request(loginUrl, 'POST', payload);
      dispatch(
        saveLoginInfo({
          ...data.user,
          access_token: data.token,
          isLoggedIn: true,
        }),
      );
      setError('');
      setLoading(false);
    } catch (err) {
      console.log({ err });
      setError('Username or password is incorrect');
      setLoading(false);
    }
  };
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

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                autoFocus
                dense
                mode="outlined"
                left={<TextInput.Icon name="email-outline" />}
                onChangeText={(text) => onChange(text)}
                style={styles.textInput}
                onBlur={onBlur}
                value={value}
                error={errors.email}
              />
            )}
            name="email"
            defaultValue=""
          />

          {errors.email && (
            <Caption style={styles.errorText}>{errors?.email?.message}</Caption>
          )}

          <Subheading style={styles.label}> Password: </Subheading>

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                dense
                mode="outlined"
                left={<TextInput.Icon name="lock-outline" />}
                right={
                  <TextInput.Icon
                    name={showPassword ? 'eye' : 'eye-off'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                onChangeText={(text) => onChange(text)}
                style={styles.textInput}
                secureTextEntry={!showPassword}
                value={value}
                error={errors.password}
              />
            )}
            name="password"
            defaultValue=""
          />

          {errors.password && (
            <Caption style={styles.errorText}>
              {errors?.password?.message}
            </Caption>
          )}

          <Text style={styles.loginFailed}>{error}</Text>

          <Button
            color={theme.colors.text}
            style={styles.btnForgot}
            uppercase={false}>
            Forgot Password?
          </Button>

          <Button
            disabled={loading}
            loading={loading}
            mode="contained"
            onPress={handleSubmit(_submit)}>
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
  errorText: {
    color: theme.colors.error,
  },
  loginFailed: {
    paddingTop: 10,
    color: theme.colors.error,
    textAlign: 'center',
  },
}));

export default withTheme(Login);
