const env = 'production';

let ROOT_API = null;
let ROOT_URL = null;

let AVATAR_URL =
  'https://react-material-dashboard.devias.io/static/images/avatars/';

switch (env) {
  case 'dev_hoang':
    ROOT_API = 'http://192.168.1.4:3001/api';
    ROOT_URL = 'http://192.168.1.4:3001';
    break;
  case 'production':
    ROOT_API = 'http://103.130.218.62:3001/api';
    ROOT_URL = 'http://103.130.218.62:3001';
    break;
  default:
    ROOT_API = 'http://103.130.218.62:3001/api';
    ROOT_URL = 'http://103.130.218.62:3001';
    break;
}

export { ROOT_API, ROOT_URL, AVATAR_URL };
