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
    ROOT_API = 'http://103.90.228.225:3001/api';
    ROOT_URL = 'http://103.90.228.225:3001';
    ROOT_IP = '103.90.228.225';
    break;
  default:
    ROOT_API = 'http://103.90.228.225:3001/api';
    ROOT_URL = 'http://103.90.228.225:3001';
    ROOT_IP = '103.90.228.225';
    break;
}

const IMAGE_UPLOAD_API =
  'https://api.cloudinary.com/v1_1/dlkjqfrze/image/upload';

export { ROOT_API, ROOT_URL, AVATAR_URL, ROOT_IP, IMAGE_UPLOAD_API };
