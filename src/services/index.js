import axios from 'axios';
import { ROOT_API, IMAGE_UPLOAD_API } from '../config';
export const request = (url, method, payload = {}) => {
  return axios({
    method: method,
    url: `${ROOT_API}${url}`,
    data: payload,
    // strictSSL: false,
  });
};

export const authRequest = (
  url,
  method,
  access_token,
  payload = {},
  cancel_token = null,
) => {
  return axios({
    method: method,
    url: `${ROOT_API}${url}`,
    data: payload,
    headers: {
      Authorization: access_token,
    },
    cancelToken: cancel_token,
    // strictSSL: false,
  });
};

export const uploadRequest = (file) => {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'f14nw4lv');
  return axios({
    url: IMAGE_UPLOAD_API,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: formData,
  });
};

export const loginUrl = '/login';
export const logoutUrl = '/logout';
export const registerURL = '/users';
export const userURL = '/user';
export const randomCategoriesURL = '/categories/random';
export const subChannelURL = '/channel/subcribed';
export const suggestChannelURL = '/channel/suggest';
export const streamerFollowedURL = '/channel/all-subcribed-streamer-profile';
export const channelURL = '/channel';
export const subStatusURL = '/channel/subcribed';
export const subcribeUrl = '/subscribe';
export const unSubcribeUrl = '/unsubscribe';
export const changePasswordUrl = '/users/change-password';
export const updateUserUrl = '/user/profile';
export const checkNameUrl = '/check/username';
export const channelByCatUrl = '/category-channel';
export const allCategoryUrl = '/categories';
export const filterChannelUrl = '/channel/filter';
export const categoryFilterUrl = '/category/filter';
export const searchUrl = '/search';
