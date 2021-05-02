import * as React from 'react';
import { Keyboard } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import {
  Button,
  Dialog,
  Subheading,
  Portal,
  TextInput,
  Caption,
} from 'react-native-paper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import { authRequest, changePasswordUrl } from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '../../../redux/actions/snackbar';

const schema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username must be 4-16 characters')
    .required('Username is required'),
  newPassword: yup.string(),
});

const UpdateUserProfile = ({ open, onClose }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.user.access_token);
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const _submit = async (payload) => {
    Keyboard.dismiss();
    delete payload.confirmPassword;
    try {
      await authRequest(changePasswordUrl, 'POST', access_token, payload);
      dispatch(
        setSnackbar({
          open: true,
          text: 'Password update successfully',
        }),
      );
      onClose();
    } catch (err) {
      dispatch(
        setSnackbar({
          open: true,
          text: 'Your current password is invalid',
        }),
      );
    }
  };

  return (
    <Portal>
      <Dialog visible={open} dismissable>
        <Dialog.Title>Update your profile</Dialog.Title>
        <Dialog.Content>
          <Subheading style={styles.label}>Username:</Subheading>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                dense
                mode="outlined"
                left={<TextInput.Icon name="lock-outline" />}
                onChangeText={(text) => onChange(text)}
                style={styles.textInput}
                secureTextEntry
                value={value}
                error={errors.password}
              />
            )}
            name="username"
            defaultValue=""
          />

          {errors.username && (
            <Caption style={styles.errorText}>
              {errors?.username?.message}
            </Caption>
          )}

          <Subheading style={styles.label}>Description:</Subheading>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                dense
                mode="outlined"
                left={<TextInput.Icon name="lock" />}
                onChangeText={(text) => onChange(text)}
                style={styles.textInput}
                secureTextEntry
                value={value}
                error={errors.description}
              />
            )}
            name="description"
            defaultValue=""
          />

          {errors.description && (
            <Caption style={styles.errorText}>
              {errors?.description?.message}
            </Caption>
          )}

          <Subheading style={styles.label}>Avatar:</Subheading>
          <Subheading style={styles.label}>Banner:</Subheading>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            uppercase={false}
            style={styles.mr_10}
            mode="text"
            onPress={() => {
              Keyboard.dismiss();
              onClose();
            }}>
            Cancel
          </Button>
          <Button
            uppercase={false}
            mode="contained"
            onPress={handleSubmit(_submit)}>
            Confirm
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default UpdateUserProfile;

const useStyles = makeStyles((theme) => ({
  label: {
    marginTop: 15,
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: theme.colors.surface,
  },
  errorText: {
    color: theme.colors.error,
  },
  mr_10: {
    marginRight: 10,
  },
}));
