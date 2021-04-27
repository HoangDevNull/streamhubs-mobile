const env = 'production';
// const env = 'dev';

let ROOT_API = null;
let ROOT_URL = null;
let ROOT_IP = null;

let AVATAR_URL =
  'https://react-material-dashboard.devias.io/static/images/avatars/';

switch (env) {
  case 'dev':
    ROOT_API = 'http://192.168.1.7:3001/api';
    ROOT_URL = 'http://192.168.1.7:3001';
    ROOT_IP = '192.168.1.7';
    break;
  case 'production':
    ROOT_API = 'http://103.130.218.62:3001/api';
    ROOT_URL = 'http://103.130.218.62:3001';
    ROOT_IP = '103.130.218.62';
    break;
  default:
    ROOT_API = 'http://103.130.218.62:3001/api';
    ROOT_URL = 'http://103.130.218.62:3001';
    ROOT_IP = '103.130.218.62';
    break;
}

export { ROOT_API, ROOT_URL, AVATAR_URL, ROOT_IP };
