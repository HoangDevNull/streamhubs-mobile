import axios from 'axios';
import { ROOT_API } from '../config';
export const request = (url, method, payload = {}) => {
  return axios({
    method: method,
    url: `${ROOT_API}${url}`,
    data: payload,
    // strictSSL: false,
  });
};

export const authRequest = (url, method, access_token, payload = {}) => {
  return axios({
    method: method,
    url: `${ROOT_API}${url}`,
    data: payload,
    headers: {
      Authorization: access_token,
    },
    // strictSSL: false,
  });
};

export const loginUrl = '/login';
export const logoutUrl = '/logout';
export const registerURL = '/users';
export const randomCategoriesURL = '/categories/random';
export const subChannelURL = '/channel/subcribed';
export const suggestChannelURL = '/channel/suggest';
export const streamerFollowedURL = '/channel/all-subcribed-streamer-profile';
