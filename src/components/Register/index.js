import React from 'react';
import { Image, SafeAreaView, View, ScrollView } from 'react-native';
import {
  Button,
  Checkbox,
  Text,
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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';

import { request, registerURL } from '../../services';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../redux/actions/snackbar';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  username: yup
    .string()
    .min(4, 'Username must be 4-16 characters')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be 6-16 characters')
    .max(16, 'Password must be 8-16 characters')
    .required('Password is required'),
  birthday: yup.date().required('Birthday is required'),
});

const Register = ({ navigation, theme }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [visible, setVisible] = React.useState(false);

  const _submit = async (payload) => {
    setLoading(true);
    try {
      await request(registerURL, 'POST', payload);
      dispatch(
        setSnackbar({
          open: true,
          text: 'Your account was successfully created',
        }),
      );
      setLoading(false);
      navigation.push('Start');
    } catch (err) {
      console.log({ err });
      if (err?.response?.status === 409) {
        dispatch(
          setSnackbar({
            open: true,
            text: 'Email or username already exists',
          }),
        );
      }

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
                error={errors.email}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="email"
            defaultValue=""
          />

          {errors.email && (
            <HelperText type="error" visible={errors.email}>
              {errors.email?.message}
            </HelperText>
          )}

          <Subheading style={styles.label}> Username: </Subheading>

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                dense
                mode="outlined"
                left={<TextInput.Icon name="account-outline" />}
                onChangeText={(text) => onChange(text)}
                style={styles.textInput}
                error={errors?.username}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="username"
            defaultValue=""
          />

          {errors.username && (
            <HelperText type="error" visible={errors?.username}>
              {errors?.username?.message}
            </HelperText>
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
                    name={!showPassword ? 'eye' : 'eye-off'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                onChangeText={(text) => onChange(text)}
                style={styles.textInput}
                secureTextEntry={!showPassword}
                error={errors.password}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="password"
            defaultValue=""
          />

          {errors.password && (
            <HelperText type="error" visible={errors.password}>
              {errors.password.message}
            </HelperText>
          )}

          <Subheading style={styles.label}> Birthday: </Subheading>

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => {
              console.log({ value });
              return (
                <>
                  {visible && (
                    <DateTimePicker
                      value={new Date(value)}
                      onChange={(e, date) => {
                        console.log({ date });
                        setVisible(false);
                        date && onChange(format(date, 'P').toString());
                      }}
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
                    {value}
                  </Button>
                </>
              );
            }}
            name="birthday"
            defaultValue={format(new Date(), 'P')}
          />

          <View style={styles.wrapCheckBox}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text>
              I agree with <Text style={styles.link}>Term & Condition</Text>
            </Text>
          </View>

          <Button
            loading={loading}
            disabled={!checked || loading}
            style={styles.btnSignUp}
            mode="contained"
            onPress={handleSubmit(_submit)}>
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
    marginTop: 8,
    marginLeft: -5,
  },
  textInput: {
    backgroundColor: theme.colors.surface,
  },
  btnSignUp: {
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 13,
  },
  datePicker: {
    borderColor: theme.colors.placeholder,
    borderWidth: 1,
    marginTop: 8,
  },
  dateContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  wrapCheckBox: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    textDecorationLine: 'underline',
    color: '#3163C1',
  },
}));

export default withTheme(Register);
