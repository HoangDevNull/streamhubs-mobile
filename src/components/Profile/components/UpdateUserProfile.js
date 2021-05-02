import * as React from 'react';
import { Keyboard, Image, View, Platform, ScrollView } from 'react-native';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import {
  Button,
  Dialog,
  Subheading,
  Portal,
  TextInput,
  Caption,
  IconButton,
} from 'react-native-paper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import { launchImageLibrary } from 'react-native-image-picker';

import { authRequest, uploadRequest } from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '../../../redux/actions/snackbar';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be 4-16 characters'),
  description: yup.string().required(),
});

const UpdateUserProfile = ({ open, onClose }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { access_token, username, userProfile } = useSelector(
    (state) => state.user,
  );
  const [avatar, setAvatar] = React.useState({
    uri: userProfile.avatar || null,
  });
  const [banner, setBanner] = React.useState({
    uri: userProfile.banner || null,
  });

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChoosePhoto = (key) => {
    launchImageLibrary({ noData: true }, async (response) => {
      const { didCancel, uri, type, fileName } = response;
      if (didCancel) return;
      if (uri) {
        const data = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const source = { uri: data, type, name: fileName };
        if (key === 'avatar') {
          setAvatar(source);
        } else {
          setBanner(source);
        }
      }
    });
  };

  const _submit = async (payload) => {
    Keyboard.dismiss();
    try {
      let bannerUrl = banner.uri;
      let avatarUrl = avatar.uri;
      if (banner.name) {
        const res = await uploadRequest(banner);
        bannerUrl = res.data.secure_url;
      }
      if (avatar.name) {
        const res = await uploadRequest(avatar);
        avatarUrl = res.data.secure_url;
      }
      payload.banner = bannerUrl;
      payload.avatar = avatarUrl;

      dispatch(
        setSnackbar({
          open: true,
          text: 'Update new profile successfully',
        }),
      );
      onClose();
    } catch (err) {
      dispatch(
        setSnackbar({
          open: true,
          text: 'Something gone wrong. Please try it later',
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
                onChangeText={(text) => onChange(text)}
                style={styles.textInput}
                value={value}
                error={errors.password}
              />
            )}
            name="username"
            defaultValue={username}
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
                multiline
                numberOfLines={3}
                dense
                mode="outlined"
                onChangeText={(text) => onChange(text)}
                style={styles.textInput}
                value={value}
                error={errors.description}
              />
            )}
            name="description"
            defaultValue={userProfile?.description}
          />

          {errors.description && (
            <Caption style={styles.errorText}>
              {errors?.description?.message}
            </Caption>
          )}

          <Subheading style={styles.label}>Avatar:</Subheading>
          <View style={styles.row}>
            {avatar && (
              <Image
                source={{ uri: avatar.uri }}
                style={{ width: 60, height: 60 }}
                resizeMode="contain"
              />
            )}
            <IconButton
              style
              icon="image-edit"
              size={25}
              onPress={() => handleChoosePhoto('avatar')}
            />
          </View>
          <Subheading style={styles.label}>Banner:</Subheading>
          <View style={styles.row}>
            {banner && (
              <Image
                source={{ uri: banner.uri }}
                style={{ width: '100%', height: 60 }}
                resizeMode="contain"
              />
            )}
          </View>
          <IconButton
            style={styles.center}
            icon="image-edit"
            size={25}
            onPress={() => handleChoosePhoto('banner')}
          />
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
  container: {
    width: '100%',
    height: '100%',
  },
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    alignSelf: 'center',
  },
}));
